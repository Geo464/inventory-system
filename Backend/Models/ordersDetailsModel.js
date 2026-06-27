class OrdersDetail {
    constructor(orderId, productId, quantity, priceAtPurchase) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
    }

    static create(orderId, productId, quantity, price) {

        if (quantity <= 0) {
            throw new Error("Cantidad inválida");
        }

        return new OrderDetail(
            orderId,
            productId,
            quantity,
            price
        );
    }

}

export default OrderDetail;