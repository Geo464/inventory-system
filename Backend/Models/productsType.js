class ProductsType {
    constructor(typeName) {
        this.typeName = typeName;
    }

    static create(typeName) {
        if (!typeName) {
            throw new Error("Tipo inválido");
        }

        return new ProductType(typeName);
    }
}

export default ProductType;