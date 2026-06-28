class CustomerType {
    constructor(typeName) {
        this.typeName = typeName;
    }

    static create(typeName) {
        if (!typeName || typeName.trim() === "") {
            throw new Error("Tipo requerido");
        }

        return new CustomerType(typeName.trim());
    }
}

module.exports = CustomerType;