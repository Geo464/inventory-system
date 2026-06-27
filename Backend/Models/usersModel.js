import bcrypt from "bcrypt";


class User {
    constructor(username, email, passwordHash, roleId, createdDate = new Date()) {
        this.username = username;
        this.email = email;
        this.password = passwordHash;
        this.roleId = roleId;
        this.createdDate = createdDate;
    }

    static async create(username, email, passwordHash, roleId) {
        if (!username || !email || !passwordHash) {
            throw new Error("Datos de usuario incompletos");
        }
        
        let hash = await bcrypt.hash(passwordHash , 10); 

        return new User(
            username,
            email,
            hash,
            roleId
        );
    }
}

export default User;