const express = require("express");
const LoginLogic = require("../Services/loginLogic");

const router = express.Router();
const loginLogic = new LoginLogic();

router.post("/authenticate", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginLogic.authenticate(email, password);
        if (!user) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ error: "Correo es requerido" });
        }
        const user = await loginLogic.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
