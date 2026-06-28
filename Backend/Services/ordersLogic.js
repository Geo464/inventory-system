const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const Order = require("../Models/ordersModel");

class OrdersLogic {
    async createOrder(data) {
        const customerId = data.customerId ?? data.customer_id;
        const userId = data.userId ?? data.user_id;
        const order = Order.create(customerId, userId);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("customer_id", sql.Int, order.customerId)
            .input("user_id", sql.Int, order.userId)
            .input("order_date", sql.Date, order.createdDate)
            .input("total", sql.Decimal(10, 2), order.total)
            .query(`INSERT INTO Orders (customer_id, user_id, order_date, total)
                    OUTPUT INSERTED.order_id
                    VALUES (@customer_id, @user_id, @order_date, @total)`);

        return {
            orderId: result.recordset[0].order_id,
            customerId: order.customerId,
            userId: order.userId,
            orderDate: order.createdDate,
            total: order.total
        };
    }

    async getOrderById(orderId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("orderId", sql.Int, orderId)
            .query("SELECT order_id, customer_id, user_id, order_date, total FROM Orders WHERE order_id = @orderId");

        if (!result.recordset.length) {
            return null;
        }

        const row = result.recordset[0];
        return {
            orderId: row.order_id,
            customerId: row.customer_id,
            userId: row.user_id,
            orderDate: row.order_date,
            total: row.total
        };
    }

    async listOrders() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT order_id, customer_id, user_id, order_date, total FROM Orders ORDER BY order_id");

        return result.recordset.map(row => ({
            orderId: row.order_id,
            customerId: row.customer_id,
            userId: row.user_id,
            orderDate: row.order_date,
            total: row.total
        }));
    }

    async getOrdersByCustomer(customerId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("customerId", sql.Int, customerId)
            .query("SELECT order_id, customer_id, user_id, order_date, total FROM Orders WHERE customer_id = @customerId ORDER BY order_id");

        return result.recordset.map(row => ({
            orderId: row.order_id,
            customerId: row.customer_id,
            userId: row.user_id,
            orderDate: row.order_date,
            total: row.total
        }));
    }

    async updateOrderTotal(orderId) {
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

module.exports = OrdersLogic;