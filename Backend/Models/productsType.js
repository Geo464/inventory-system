class ProductType {
    constructor(typeName) {
        this.typeName = typeName;
    }

    static create(typeName) {
        if (!typeName || typeName.trim() === "") {
            throw new Error("Tipo inválido");
        }

        return new ProductType(typeName.trim());
    }
}

module.exports = ProductType;