import mongoose from "mongoose";
import connectDB from "../config/db.js";
import District from "../models/District.js";
import Taluka from "../models/Taluka.js";
import Market from "../models/Market.js";
import MarketPriceDaily from "../models/MarketPriceDaily.js";
import dotenv from "dotenv";

dotenv.config();

const runValidation = async () => {
  try {
    await connectDB();
    console.log("--- Running Production Data Validation Suite ---\n");

    let issuesFound = 0;

    // 1. Check for Duplicate Markets
    const markets = await Market.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    
    if (markets.length > 0) {
      console.log(`[WARNING] Found ${markets.length} duplicate Market names.`);
      console.log("Duplicates:", markets.map(m => m._id));
      issuesFound++;
    } else {
      console.log("[OK] No duplicate markets found.");
    }

    // 2. Check for Duplicate Price Records natively
    const duplicatePrices = await MarketPriceDaily.aggregate([
      { $group: { 
          _id: { marketName: "$marketName", commodityName: "$commodityName", variety: "$variety", priceDate: "$priceDate" }, 
          count: { $sum: 1 } 
      }},
      { $match: { count: { $gt: 1 } } }
    ]);

    if (duplicatePrices.length > 0) {
      console.log(`[WARNING] Found ${duplicatePrices.length} duplicate daily price records.`);
      issuesFound++;
    } else {
      console.log("[OK] No duplicate daily price records found.");
    }

    // 3. Orphaned Markets check
    const orphanedMarkets = await Market.find({ districtName: { $exists: false } });
    if (orphanedMarkets.length > 0) {
      console.log(`[WARNING] Found ${orphanedMarkets.length} orphaned markets without district.`);
      issuesFound++;
    } else {
      console.log("[OK] No orphaned markets found.");
    }

    // 4. District Consistency Check
    const totalDistricts = await District.countDocuments({ stateCode: "MH" });
    if (totalDistricts === 36) {
      console.log("[OK] All 36 Maharashtra districts are mapped correctly.");
    } else {
      console.log(`[WARNING] Database has ${totalDistricts} districts instead of the expected 36.`);
      issuesFound++;
    }

    console.log(`\nValidation Complete. Total issues found: ${issuesFound}`);
    await mongoose.connection.close();
    process.exit(issuesFound > 0 ? 1 : 0);

  } catch (error) {
    console.error("Validation failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

runValidation();
