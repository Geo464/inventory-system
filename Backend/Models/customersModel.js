class Customer {
    constructor(name, typeId, createdDate = new Date()) {
        this.name = name;
        this.typeId = typeId;
        this.createdDate = createdDate;
    }

    static create(name, typeId) {
        if (!name || name.trim() === "") {
            throw new Error("Nombre requerido");
        }

        return new Customer(
            name.trim(),
            typeId,
            new Date()
        );
    }
}

module.exports = Customer;