import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import State from "../models/State.js";
import District from "../models/District.js";
import Taluka from "../models/Taluka.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

/**
 * Normalizes strings by trimming and capitalizing each word.
 */
function normalizeName(name) {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const importHierarchy = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB. Starting Hierarchy Import...");

    // 1. Ensure State exists
    await State.updateOne(
      { code: "MH" },
      { $set: { name: "Maharashtra", code: "MH" } },
      { upsert: true }
    );
    console.log("Upserted State: Maharashtra (MH)");

    // 2. Read JSON payload
    const dataPath = path.join(__dirname, "data", "maharashtra_admin.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const adminData = JSON.parse(rawData);

    let districtOps = [];
    let talukaOps = [];

    // 3. Build bulk ops
    for (const record of adminData) {
      const distName = normalizeName(record.district);

      districtOps.push({
        updateOne: {
          filter: { name: distName, stateCode: "MH" },
          update: { $set: { name: distName, stateCode: "MH" } },
          upsert: true,
        },
      });

      if (record.talukas && Array.isArray(record.talukas)) {
        for (const t of record.talukas) {
          const talName = normalizeName(t);
          talukaOps.push({
            updateOne: {
              filter: { name: talName, districtName: distName, stateCode: "MH" },
              update: { $set: { name: talName, districtName: distName, stateCode: "MH" } },
              upsert: true,
            },
          });
        }
      }
    }

    if (districtOps.length > 0) {
      const distResult = await District.bulkWrite(districtOps);
      console.log(`Districts imported. Upserted/Modified: ${distResult.upsertedCount + distResult.modifiedCount}`);
    }

    if (talukaOps.length > 0) {
      const talResult = await Taluka.bulkWrite(talukaOps);
      console.log(`Talukas imported. Upserted/Modified: ${talResult.upsertedCount + talResult.modifiedCount}`);
    }

    console.log("Hierarchy import completed successfully!");
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Hierarchy import failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

importHierarchy();
