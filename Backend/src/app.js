import express from "express";
import cors from "cors";

import stateRoutes from "./routes/stateRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import talukaRoutes from "./routes/talukaRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import commodityRoutes from "./routes/commodityRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AgriPulse API is running",
  });
});

app.use("/api/states", stateRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/talukas", talukaRoutes);
app.use("/api/markets", marketRoutes);
app.use("/api/commodities", commodityRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/recommendation", recommendationRoutes);

export default app;