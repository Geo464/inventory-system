class OrderDetail {
    constructor(orderId, productId, quantity, priceAtPurchase) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
    }

    static create(orderId, productId, quantity, priceAtPurchase) {
        if (!orderId || !productId) {
            throw new Error("Orden y producto requeridos");
        }

        if (quantity <= 0) {
            throw new Error("Cantidad inválida");
        }

        if (priceAtPurchase <= 0) {
            throw new Error("Precio inválido");
        }

        return new OrderDetail(
            orderId,
            productId,
            quantity,
            priceAtPurchase
        );
    }
}

module.exports = OrderDetail;