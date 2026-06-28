const sql = require("mssql");
const bcrypt = require("bcrypt");
const connectSQL = require("../../Database/connection");
const User = require("../Models/usersModel");

class UsersLogic {
    async createUser(data) {
        const username = (data.username || "").trim();
        const email = (data.email || "").trim().toLowerCase();
        const password = data.password;
        const roleId = data.roleId ?? data.role_id;

        const newUser = await User.create(username, email, password, roleId);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("user_username", sql.VarChar(50), newUser.username)
            .input("user_email", sql.VarChar(255), newUser.email)
            .input("user_password", sql.VarChar(255), newUser.password)
            .input("role_id", sql.Int, newUser.roleId)
            .input("user_created_date", sql.Date, newUser.createdDate)
            .query(`INSERT INTO Users (user_username, user_email, user_password, role_id, user_created_date)
                    OUTPUT INSERTED.user_id
                    VALUES (@user_username, @user_email, @user_password, @role_id, @user_created_date)`);

        return {
            userId: result.recordset[0].user_id,
            username: newUser.username,
            email: newUser.email,
            roleId: newUser.roleId,
            createdDate: newUser.createdDate
        };
    }

    async getUserById(userId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query("SELECT user_id, user_username, user_email, role_id, user_created_date FROM Users WHERE user_id = @userId");

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

    async listUsers() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT user_id, user_username, user_email, role_id, user_created_date FROM Users ORDER BY user_id");

        return result.recordset.map(row => ({
            userId: row.user_id,
            username: row.user_username,
            email: row.user_email,
            roleId: row.role_id,
            createdDate: row.user_created_date
        }));
    }

    async updateUser(userId, data) {
        const existing = await this.getUserById(userId);
        if (!existing) {
            throw new Error("Usuario no encontrado");
        }

        const username = (data.username || existing.username).trim();
        const email = (data.email || existing.email).trim().toLowerCase();
        const roleId = data.roleId ?? data.role_id ?? existing.roleId;
        let passwordHash = null;

        if (data.password) {
            passwordHash = await bcrypt.hash(data.password, 10);
        }

        const pool = await connectSQL;
        const request = pool.request()
            .input("userId", sql.Int, userId)
            .input("user_username", sql.VarChar(50), username)
            .input("user_email", sql.VarChar(255), email)
            .input("role_id", sql.Int, roleId);

        if (passwordHash) {
            request.input("user_password", sql.VarChar(255), passwordHash);
            await request.query("UPDATE Users SET user_username = @user_username, user_email = @user_email, user_password = @user_password, role_id = @role_id WHERE user_id = @userId");
        } else {
            await request.query("UPDATE Users SET user_username = @user_username, user_email = @user_email, role_id = @role_id WHERE user_id = @userId");
        }

        return {
            userId,
            username,
            email,
            roleId,
            createdDate: existing.createdDate
        };
    }

    async deleteUser(userId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query("DELETE FROM Users WHERE user_id = @userId");

        return result.rowsAffected[0] > 0;
    }
}

module.exports = UsersLogic;