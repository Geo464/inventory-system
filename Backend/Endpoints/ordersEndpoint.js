const express = require("express");
const OrdersLogic = require("../Services/ordersLogic");

const router = express.Router();
const ordersLogic = new OrdersLogic();

router.get("/", async (req, res) => {
    try {
        const orders = await ordersLogic.listOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const order = await ordersLogic.getOrderById(Number(req.params.id));
        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/customer/:customerId", async (req, res) => {
    try {
        const orders = await ordersLogic.getOrdersByCustomer(Number(req.params.customerId));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdOrder = await ordersLogic.createOrder(req.body);
        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/:id/refresh-total", async (req, res) => {
    try {
        const total = await ordersLogic.updateOrderTotal(Number(req.params.id));
        res.json({ orderId: Number(req.params.id), total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

