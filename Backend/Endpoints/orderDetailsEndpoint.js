const express = require("express");
const OrderDetailsLogic = require("../Services/ordersDetailLogic");

const router = express.Router();
const orderDetailsLogic = new OrderDetailsLogic();

router.get("/order/:orderId", async (req, res) => {
    try {
        const details = await orderDetailsLogic.listDetailsByOrder(Number(req.params.orderId));
        res.json(details);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdDetail = await orderDetailsLogic.addOrderDetail(req.body);
        res.status(201).json(createdDetail);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
