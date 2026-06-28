const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const OrderDetail = require("../Models/ordersDetailsModel");

class OrderDetailsLogic {
    async addOrderDetail(data) {
        const orderId = data.orderId ?? data.order_id;
        const productId = data.productId ?? data.product_id;
        const quantity = data.quantity;
        let priceAtPurchase = data.priceAtPurchase ?? data.price_at_purchase;

        const detail = OrderDetail.create(orderId, productId, quantity, priceAtPurchase);
        const pool = await connectSQL;

        const productResult = await pool.request()
            .input("productId", sql.Int, detail.productId)
            .query("SELECT product_stock, product_price FROM Products WHERE product_id = @productId");

        if (!productResult.recordset.length) {
            throw new Error("Producto no encontrado");
        }

        const product = productResult.recordset[0];
        if (product.product_stock < detail.quantity) {
            throw new Error("Stock insuficiente para el producto");
        }

        if (priceAtPurchase === undefined || priceAtPurchase === null) {
            priceAtPurchase = product.product_price;
        }

        const result = await pool.request()
            .input("order_id", sql.Int, detail.orderId)
            .input("product_id", sql.Int, detail.productId)
            .input("quantity", sql.Int, detail.quantity)
            .input("price_at_purchase", sql.Decimal(10, 2), priceAtPurchase)
            .query(`INSERT INTO Order_Details (order_id, product_id, quantity, price_at_purchase)
                    OUTPUT INSERTED.detail_id
                    VALUES (@order_id, @product_id, @quantity, @price_at_purchase)`);

        await pool.request()
            .input("productId", sql.Int, detail.productId)
            .input("quantity", sql.Int, detail.quantity)
            .query("UPDATE Products SET product_stock = product_stock - @quantity WHERE product_id = @productId");

        await this._refreshOrderTotal(detail.orderId);

        return {
            detailId: result.recordset[0].detail_id,
            orderId: detail.orderId,
            productId: detail.productId,
            quantity: detail.quantity,
            priceAtPurchase
        };
    }

    async listDetailsByOrder(orderId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("orderId", sql.Int, orderId)
            .query("SELECT detail_id, order_id, product_id, quantity, price_at_purchase FROM Order_Details WHERE order_id = @orderId ORDER BY detail_id");

        return result.recordset.map(row => ({
            detailId: row.detail_id,
            orderId: row.order_id,
            productId: row.product_id,
            quantity: row.quantity,
            priceAtPurchase: row.price_at_purchase
        }));
    }

    async _refreshOrderTotal(orderId) {
        const pool = await connectSQL;
        const totalResult = await pool.request()
            .input("orderId", sql.Int, orderId)
            .query("SELECT SUM(quantity * price_at_purchase) AS total FROM Order_Details WHERE order_id = @orderId");

        const total = totalResult.recordset[0].total || 0;
        await pool.request()
            .input("orderId", sql.Int, orderId)
            .input("total", sql.Decimal(10, 2), total)
            .query("UPDATE Orders SET total = @total WHERE order_id = @orderId");

        return total;
    }
}

module.exports = OrderDetailsLogic;