import express from 'express';
import { authenticateToken } from '../Logic/auth.js';

const router = express.Router();

// Placeholder - se implementará después
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'API de productos en desarrollo' });
});

export default router;
