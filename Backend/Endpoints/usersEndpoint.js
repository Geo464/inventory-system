const express = require("express");
const UsersLogic = require("../Services/usersLogic");

const router = express.Router();
const usersLogic = new UsersLogic();

router.get("/", async (req, res) => {
    try {
        const users = await usersLogic.listUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await usersLogic.getUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdUser = await usersLogic.createUser(req.body);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await usersLogic.updateUser(Number(req.params.id), req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await usersLogic.deleteUser(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
