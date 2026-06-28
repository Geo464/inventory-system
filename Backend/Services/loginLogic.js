const sql = require("mssql");
const bcrypt = require("bcrypt");
const connectSQL = require("../../Database/connection");

class LoginLogic {
    async authenticate(email, password) {
        if (!email || !password) {
            throw new Error("Correo y contraseña son requeridos");
        }

        const pool = await connectSQL;
        const result = await pool.request()
            .input("email", sql.VarChar(255), email.trim().toLowerCase())
            .query(`SELECT u.user_id, u.user_username, u.user_email, u.user_password, u.role_id, u.user_created_date, r.role_name
                    FROM Users u
                    LEFT JOIN Roles r ON u.role_id = r.role_id
                    WHERE u.user_email = @email`);

        if (!result.recordset.length) {
            return null;
        }

        const row = result.recordset[0];
        const isMatch = await bcrypt.compare(password, row.user_password);
        if (!isMatch) {
            return null;
        }

        return {
            userId: row.user_id,
            username: row.user_username,
            email: row.user_email,
            roleId: row.role_id,
            roleName: row.role_name,
            createdDate: row.user_created_date
        };
    }

    async getUserByEmail(email) {
        if (!email) {
            throw new Error("Correo es requerido");
        }

        const pool = await connectSQL;
        const result = await pool.request()
            .input("email", sql.VarChar(255), email.trim().toLowerCase())
            .query("SELECT user_id, user_username, user_email, role_id, user_created_date FROM Users WHERE user_email = @email");

        if (!result.recordset.length) {
            return null;
        }

        const row = result.recordset[0];
        return {
            userId: row.user_id,
            username: row.user_username,
            email: row.user_email,
            roleId: row.role_id,
            createdDate: row.user_created_date
        };
    }
}

module.exports = LoginLogic;