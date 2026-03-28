import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Market from "../models/Market.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

function normalizeName(name) {
  if (!name) return "";
  return name.trim();
}

const importMarkets = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB. Starting Market Import...");

    const dataPath = path.join(__dirname, "data", "maharashtra_markets.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const marketData = JSON.parse(rawData);

    let marketOps = [];

    for (const record of marketData) {
      const marketName = normalizeName(record.marketName);
      const districtName = normalizeName(record.districtName);
      const talukaName = normalizeName(record.talukaName);

      marketOps.push({
        updateOne: {
          filter: { name: marketName, districtName: districtName, talukaName: talukaName, stateCode: "MH" },
          update: { 
            $set: { 
              name: marketName, 
              districtName: districtName, 
              talukaName: talukaName, 
              stateCode: "MH",
              marketType: "APMC" 
            } 
          },
          upsert: true,
        },
      });
    }

    if (marketOps.length > 0) {
      const result = await Market.bulkWrite(marketOps);
      console.log(`Markets imported. Upserted/Modified: ${result.upsertedCount + result.modifiedCount}`);
    }

    console.log("Market import completed successfully!");
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Market import failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

importMarkets();
