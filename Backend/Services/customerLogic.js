import Customers from "./Models"

let u = {
    username: "Juan",
    email: "juan@example.com",
    password: "123456",
    roleId: 1,
    createdDate: "2026-06-26"
};

class CustomersLogic {
    async createCustomer(data) {
        let username = data.username;
        let email = data.email;
        let password = data.password;
        let roleId = data.roleId;
        let createdDate = data.createdDate;
        let UserP = await Customers.createCustomer(username, email, password, roleId, createdDate);
        return UserP;
    }

    async readCustomerData(userEmail){
        
    }
}

console.log(CustomersLogic.createCustomer(u));

export { u };
export default CustomersLogic;