import bcrypt from 'bcrypt';

class User {
    constructor(username, email, hashedPassword, typeUser = 'user') {
        this.username = username;
        this.email = email;
        this.password = hashedPassword;
        this.typeUser = typeUser;
        this.createdAt = new Date();
    }

    static async createUser(username , email , password , typerUser = "user"){
        const hashedPassword = await bcrypt.hash(password , 10);

        return new User(
            username , 
            email , 
            hashedPassword , 
            typerUser
        );
    }
}

export default User;