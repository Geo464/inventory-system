const express = require("express");
const ProductsLogic = require("../Services/productsLogic");

const router = express.Router();
const productsLogic = new ProductsLogic();

router.get("/", async (req, res) => {
    try {
        const products = await productsLogic.listProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await productsLogic.getProductById(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdProduct = await productsLogic.createProduct(req.body);
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await productsLogic.updateProduct(Number(req.params.id), req.body);
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await productsLogic.deleteProduct(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
