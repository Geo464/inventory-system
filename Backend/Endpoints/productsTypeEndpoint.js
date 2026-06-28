const express = require("express");
const ProductsTypeLogic = require("../Services/productsTypeLogic");

const router = express.Router();
const productsTypeLogic = new ProductsTypeLogic();

router.get("/", async (req, res) => {
    try {
        const types = await productsTypeLogic.listProductTypes();
        res.json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const type = await productsTypeLogic.getProductTypeById(Number(req.params.id));
        if (!type) {
            return res.status(404).json({ error: "Tipo de producto no encontrado" });
        }
        res.json(type);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdType = await productsTypeLogic.createProductType(req.body);
        res.status(201).json(createdType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedType = await productsTypeLogic.updateProductType(Number(req.params.id), req.body);
        res.json(updatedType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await productsTypeLogic.deleteProductType(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: "Tipo de producto no encontrado" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
