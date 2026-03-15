import express from "express";
import { getCommodities } from "../controllers/commodityController.js";

const router = express.Router();

router.get("/", getCommodities);

export default router;