import express from 'express';
import { getGamesPair } from '../controllers/gameController.js';

const router = express.Router();

router.get('/pair', getGamesPair);

export default router;
