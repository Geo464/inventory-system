const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const Product = require("../Models/productsModel");

class ProductsLogic {
    async createProduct(data) {
        const name = (data.name || data.productName || "").trim();
        const price = data.price;
        const stock = data.stock;
        const typeId = data.typeId ?? data.type_id;
        const product = Product.create(name, price, stock, typeId);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("product_name", sql.VarChar(50), product.name)
            .input("product_stock", sql.Int, product.stock)
            .input("product_price", sql.Decimal(10, 2), product.price)
            .input("type_id", sql.Int, product.typeId)
            .query(`INSERT INTO Products (product_name, product_stock, product_price, type_id)
                    OUTPUT INSERTED.product_id
                    VALUES (@product_name, @product_stock, @product_price, @type_id)`);

        return {
            productId: result.recordset[0].product_id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            typeId: product.typeId
        };
    }

    async getProductById(productId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("productId", sql.Int, productId)
            .query("SELECT product_id, product_name, product_stock, product_price, type_id FROM Products WHERE product_id = @productId");

        if (!result.recordset.length) {
            return null;
        }

        const row = result.recordset[0];
        return {
            productId: row.product_id,
            name: row.product_name,
            stock: row.product_stock,
            price: row.product_price,
            typeId: row.type_id
        };
    }

    async listProducts() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT product_id, product_name, product_stock, product_price, type_id FROM Products ORDER BY product_id");

        return result.recordset.map(row => ({
            productId: row.product_id,
            name: row.product_name,
            stock: row.product_stock,
            price: row.product_price,
            typeId: row.type_id
        }));
    }

    async updateProduct(productId, data) {
        const existing = await this.getProductById(productId);
        if (!existing) {
            throw new Error("Producto no encontrado");
        }

        const name = (data.name || data.productName || existing.name).trim();
        const price = data.price ?? existing.price;
        const stock = data.stock ?? existing.stock;
        const typeId = data.typeId ?? data.type_id ?? existing.typeId;

        const updatedProduct = Product.create(name, price, stock, typeId);
        const pool = await connectSQL;
        await pool.request()
            .input("productId", sql.Int, productId)
            .input("product_name", sql.VarChar(50), updatedProduct.name)
            .input("product_stock", sql.Int, updatedProduct.stock)
            .input("product_price", sql.Decimal(10, 2), updatedProduct.price)
            .input("type_id", sql.Int, updatedProduct.typeId)
            .query("UPDATE Products SET product_name = @product_name, product_stock = @product_stock, product_price = @product_price, type_id = @type_id WHERE product_id = @productId");

        return {
            productId,
            name: updatedProduct.name,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            typeId: updatedProduct.typeId
        };
    }

    async deleteProduct(productId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("productId", sql.Int, productId)
            .query("DELETE FROM Products WHERE product_id = @productId");

        return result.rowsAffected[0] > 0;
    }

    async adjustStock(productId, quantityChange) {
        const pool = await connectSQL;
        const product = await this.getProductById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const newStock = product.stock + quantityChange;
        if (newStock < 0) {
            throw new Error("Stock insuficiente");
        }

        await pool.request()
            .input("productId", sql.Int, productId)
            .input("newStock", sql.Int, newStock)
            .query("UPDATE Products SET product_stock = @newStock WHERE product_id = @productId");

        return {
            productId,
            stock: newStock
        };
    }
}

module.exports = ProductsLogic;