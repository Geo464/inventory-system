class Product {
    constructor(name, price, stock, typeId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.typeId = typeId;
    }

    static create(name, price, stock, typeId) {
        if (!name || name.trim() === "") {
            throw new Error("Nombre inválido");
        }

        if (price === undefined || price === null || price <= 0) {
            throw new Error("Precio inválido");
        }

        if (stock === undefined || stock === null || stock < 0) {
            throw new Error("Stock inválido");
        }

        return new Product(
            name.trim(),
            Number(price),
            Number(stock),
            typeId
        );
    }
}

module.exports = Product;