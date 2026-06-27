class Orders {
    constructor(customerId, total = 0, createdDate = new Date()) {
        this.customerId = customerId;
        this.total = total;
        this.createdDate = createdDate;
    }

    static create(customerId) {

        if (!customerId) {
            throw new Error("Cliente requerido");
        }

        return new Order(customerId);
    }
}

export default Order;