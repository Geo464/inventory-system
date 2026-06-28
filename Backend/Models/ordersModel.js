class Order {
    constructor(customerId, userId, total = 0, createdDate = new Date()) {
        this.customerId = customerId;
        this.userId = userId;
        this.total = total;
        this.createdDate = createdDate;
    }

    static create(customerId, userId) {
        if (!customerId) {
            throw new Error("Cliente requerido");
        }

        if (!userId) {
            throw new Error("Usuario requerido");
        }

        return new Order(customerId, userId, 0, new Date());
    }
}

module.exports = Order;