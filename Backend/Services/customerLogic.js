const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const Customer = require("../Models/customersModel");

class CustomersLogic {
    async createCustomer(data) {
        const name = (data.name || data.customerName || "").trim();
        const typeId = data.typeId ?? data.type_id;
        const customer = Customer.create(name, typeId);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("customer_name", sql.VarChar(50), customer.name)
            .input("type_id", sql.Int, customer.typeId)
            .input("customer_created_date", sql.Date, customer.createdDate)
            .query(`INSERT INTO Customers (customer_name, type_id, customer_created_date)
                    OUTPUT INSERTED.customer_id
                    VALUES (@customer_name, @type_id, @customer_created_date)`);

        return {
            customerId: result.recordset[0].customer_id,
            name: customer.name,
            typeId: customer.typeId,
            createdDate: customer.createdDate
        };
    }

    async getCustomerById(customerId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("customerId", sql.Int, customerId)
            .query("SELECT customer_id, customer_name, type_id, customer_created_date FROM Customers WHERE customer_id = @customerId");

        if (!result.recordset.length) {
            return null;
        }

        const row = result.recordset[0];
        return {
            customerId: row.customer_id,
            name: row.customer_name,
            typeId: row.type_id,
            createdDate: row.customer_created_date
        };
    }

    async listCustomers() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT customer_id, customer_name, type_id, customer_created_date FROM Customers ORDER BY customer_id");

        return result.recordset.map(row => ({
            customerId: row.customer_id,
            name: row.customer_name,
            typeId: row.type_id,
            createdDate: row.customer_created_date
        }));
    }

    async updateCustomer(customerId, data) {
        const existing = await this.getCustomerById(customerId);
        if (!existing) {
            throw new Error("Cliente no encontrado");
        }

        const name = (data.name || data.customerName || existing.name).trim();
        const typeId = data.typeId ?? data.type_id ?? existing.typeId;

        const pool = await connectSQL;
        await pool.request()
            .input("customerId", sql.Int, customerId)
            .input("customer_name", sql.VarChar(50), name)
            .input("type_id", sql.Int, typeId)
            .query("UPDATE Customers SET customer_name = @customer_name, type_id = @type_id WHERE customer_id = @customerId");

        return {
            customerId,
            name,
            typeId,
            createdDate: existing.createdDate
        };
    }

    async deleteCustomer(customerId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("customerId", sql.Int, customerId)
            .query("DELETE FROM Customers WHERE customer_id = @customerId");

        return result.rowsAffected[0] > 0;
    }
}

module.exports = CustomersLogic;