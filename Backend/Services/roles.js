const sql = require("mssql");
const connectSQL = require("../../Database/connection");
const Role = require("../Models/rolesModel");

class RolesLogic {
    async createRole(data) {
        const roleName = (data.roleName || data.role_name || "").trim();
        const role = Role.create(roleName);

        const pool = await connectSQL;
        const result = await pool.request()
            .input("role_name", sql.VarChar(50), role.roleName)
            .query(`INSERT INTO Roles (role_name)
                    OUTPUT INSERTED.role_id
                    VALUES (@role_name)`);

        return {
            roleId: result.recordset[0].role_id,
            roleName: role.roleName
        };
    }

    async listRoles() {
        const pool = await connectSQL;
        const result = await pool.request()
            .query("SELECT role_id, role_name FROM Roles ORDER BY role_id");

        return result.recordset.map(row => ({
            roleId: row.role_id,
            roleName: row.role_name
        }));
    }

    async getRoleById(roleId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("roleId", sql.Int, roleId)
            .query("SELECT role_id, role_name FROM Roles WHERE role_id = @roleId");

        if (!result.recordset.length) {
            return null;
        }

        return {
            roleId: result.recordset[0].role_id,
            roleName: result.recordset[0].role_name
        };
    }

    async updateRole(roleId, data) {
        const existing = await this.getRoleById(roleId);
        if (!existing) {
            throw new Error("Rol no encontrado");
        }

        const roleName = (data.roleName || data.role_name || existing.roleName).trim();
        const role = Role.create(roleName);

        const pool = await connectSQL;
        await pool.request()
            .input("roleId", sql.Int, roleId)
            .input("role_name", sql.VarChar(50), role.roleName)
            .query("UPDATE Roles SET role_name = @role_name WHERE role_id = @roleId");

        return {
            roleId,
            roleName: role.roleName
        };
    }

    async deleteRole(roleId) {
        const pool = await connectSQL;
        const result = await pool.request()
            .input("roleId", sql.Int, roleId)
            .query("DELETE FROM Roles WHERE role_id = @roleId");

        return result.rowsAffected[0] > 0;
    }
}

module.exports = RolesLogic;