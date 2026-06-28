const express = require("express");
const CustomersLogic = require("../Services/customerLogic");

const router = express.Router();
const customersLogic = new CustomersLogic();

router.get("/", async (req, res) => {
    try {
        const customers = await customersLogic.listCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await customersLogic.getCustomerById(Number(req.params.id));
        if (!customer) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdCustomer = await customersLogic.createCustomer(req.body);
        res.status(201).json(createdCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedCustomer = await customersLogic.updateCustomer(Number(req.params.id), req.body);
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await customersLogic.deleteCustomer(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
