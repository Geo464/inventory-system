class Customers {
    constructor(name, typeId, createdDate = new Date()) {
        this.name = name;
        this.typeId = typeId;
        this.createdDate = createdDate;
    }

    static create(name, typeId) {
        if (!name) {
            throw new Error("Nombre requerido");
        }

        return new Customer(
            name,
            typeId
        );
    }
}

export default Customer;