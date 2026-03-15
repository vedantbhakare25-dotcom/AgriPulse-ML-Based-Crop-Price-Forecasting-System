import express from "express";
import { getTalukas } from "../controllers/talukaController.js";

const router = express.Router();

router.get("/", getTalukas);

export default router;