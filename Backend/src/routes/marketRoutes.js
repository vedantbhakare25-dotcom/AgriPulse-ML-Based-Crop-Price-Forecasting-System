import express from "express";
import { getMarkets } from "../controllers/marketController.js";

const router = express.Router();

router.get("/", getMarkets);

export default router;