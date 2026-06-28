const bcrypt = require("bcrypt");

class User {
    constructor(username, email, passwordHash, roleId, createdDate = new Date()) {
        this.username = username;
        this.email = email;
        this.password = passwordHash;
        this.roleId = roleId;
        this.createdDate = createdDate;
    }

    static async create(username, email, password, roleId) {
        if (!username || !email || !password) {
            throw new Error("Datos de usuario incompletos");
        }

        let hash;
        try {
            hash = await bcrypt.hash(password, 10);
        } catch (err) {
            throw new Error("Error de ejecución al crear usuario");
        }

        return new User(
            username.trim(),
            email.trim().toLowerCase(),
            hash,
            roleId,
            new Date()
        );
    }
}

module.exports = User;