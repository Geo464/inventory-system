class CustomersType {
    constructor(typeName) {
        this.typeName = typeName;
    }

    static create(typeName) {
        if (!typeName) {
            throw new Error("Tipo requerido");
        }

        return new CustomerType(typeName);
    }
}

export default CustomerType;