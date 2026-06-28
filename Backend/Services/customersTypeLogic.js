const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const CustomerType = require("../Models/customersTypeModel");

class CustomersTypeLogic {
    async createCustomerType(data) {
        const typeName = (data.typeName || data.type_name || "").trim();
        const customerType = CustomerType.create(typeName);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("type_name", sql.VarChar(50), customerType.typeName)
            .query(`INSERT INTO Customers_Type (type_name)
                    OUTPUT INSERTED.type_id
                    VALUES (@type_name)`);

        return {
            typeId: result.recordset[0].type_id,
            typeName: customerType.typeName
        };
    }

    async getCustomerTypeById(typeId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("typeId", sql.Int, typeId)
            .query("SELECT type_id, type_name FROM Customers_Type WHERE type_id = @typeId");

        if (!result.recordset.length) {
            return null;
        }

        return {
            typeId: result.recordset[0].type_id,
            typeName: result.recordset[0].type_name
        };
    }

    async listCustomerTypes() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT type_id, type_name FROM Customers_Type ORDER BY type_id");

        return result.recordset.map(row => ({
            typeId: row.type_id,
            typeName: row.type_name
        }));
    }

    async deleteCustomerType(typeId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("typeId", sql.Int, typeId)
            .query("DELETE FROM Customers_Type WHERE type_id = @typeId");

        return result.rowsAffected[0] > 0;
    }
}

module.exports = CustomersTypeLogic;