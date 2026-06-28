const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const ProductType = require("../Models/productsType");

class ProductsTypeLogic {
    async createProductType(data) {
        const typeName = (data.typeName || data.type_name || "").trim();
        const productType = ProductType.create(typeName);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("type_name", sql.VarChar(50), productType.typeName)
            .query(`INSERT INTO Type_Products (type_name)
                    OUTPUT INSERTED.type_id
                    VALUES (@type_name)`);

        return {
            typeId: result.recordset[0].type_id,
            typeName: productType.typeName
        };
    }

    async getProductTypeById(typeId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("typeId", sql.Int, typeId)
            .query("SELECT type_id, type_name FROM Type_Products WHERE type_id = @typeId");

        if (!result.recordset.length) {
            return null;
        }

        return {
            typeId: result.recordset[0].type_id,
            typeName: result.recordset[0].type_name
        };
    }

    async listProductTypes() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT type_id, type_name FROM Type_Products ORDER BY type_id");

        return result.recordset.map(row => ({
            typeId: row.type_id,
            typeName: row.type_name
        }));
    }

    async updateProductType(typeId, data) {
        const existing = await this.getProductTypeById(typeId);
        if (!existing) {
            throw new Error("Tipo de producto no encontrado");
        }

        const typeName = (data.typeName || data.type_name || existing.typeName).trim();
        const productType = ProductType.create(typeName);

        const pool = await connectSQL;
        await pool.request()
            .input("typeId", sql.Int, typeId)
            .input("type_name", sql.VarChar(50), productType.typeName)
            .query("UPDATE Type_Products SET type_name = @type_name WHERE type_id = @typeId");

        return {
            typeId,
            typeName: productType.typeName
        };
    }

    async deleteProductType(typeId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("typeId", sql.Int, typeId)
            .query("DELETE FROM Type_Products WHERE type_id = @typeId");

        return result.rowsAffected[0] > 0;
    }
}

module.exports = ProductsTypeLogic;