const express = require("express");
const RolesLogic = require("../Services/roles");

const router = express.Router();
const rolesLogic = new RolesLogic();

router.get("/", async (req, res) => {
    try {
        const roles = await rolesLogic.listRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const role = await rolesLogic.getRoleById(Number(req.params.id));
        if (!role) {
            return res.status(404).json({ error: "Rol no encontrado" });
        }
        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdRole = await rolesLogic.createRole(req.body);
        res.status(201).json(createdRole);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedRole = await rolesLogic.updateRole(Number(req.params.id), req.body);
        res.json(updatedRole);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await rolesLogic.deleteRole(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: "Rol no encontrado" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
