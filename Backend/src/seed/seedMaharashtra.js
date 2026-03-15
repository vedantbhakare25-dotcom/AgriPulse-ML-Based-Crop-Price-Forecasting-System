import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import State from "../models/State.js";
import District from "../models/District.js";
import Taluka from "../models/Taluka.js";
import Market from "../models/Market.js";
import Commodity from "../models/Commodity.js";
import MarketCommodity from "../models/MarketCommodity.js";
import MarketPriceDaily from "../models/MarketPriceDaily.js";

dotenv.config();

const seedMaharashtraData = async () => {
  try {
    await connectDB();

    await Promise.all([
      State.deleteMany({}),
      District.deleteMany({}),
      Taluka.deleteMany({}),
      Market.deleteMany({}),
      Commodity.deleteMany({}),
      MarketCommodity.deleteMany({}),
      MarketPriceDaily.deleteMany({}),
    ]);

    await State.create({
      name: "Maharashtra",
      code: "MH",
    });

    await District.insertMany([
      { name: "Nashik", stateCode: "MH" },
      { name: "Pune", stateCode: "MH" },
      { name: "Ahmednagar", stateCode: "MH" },
    ]);

    await Taluka.insertMany([
      { name: "Niphad", districtName: "Nashik", stateCode: "MH" },
      { name: "Yeola", districtName: "Nashik", stateCode: "MH" },
      { name: "Haveli", districtName: "Pune", stateCode: "MH" },
      { name: "Rahata", districtName: "Ahmednagar", stateCode: "MH" },
    ]);

    await Market.insertMany([
      {
        name: "Lasalgaon APMC",
        districtName: "Nashik",
        talukaName: "Niphad",
        stateCode: "MH",
        marketType: "APMC",
      },
      {
        name: "Yeola APMC",
        districtName: "Nashik",
        talukaName: "Yeola",
        stateCode: "MH",
        marketType: "APMC",
      },
      {
        name: "Pune Market Yard",
        districtName: "Pune",
        talukaName: "Haveli",
        stateCode: "MH",
        marketType: "APMC",
      },
      {
        name: "Rahata APMC",
        districtName: "Ahmednagar",
        talukaName: "Rahata",
        stateCode: "MH",
        marketType: "APMC",
      },
    ]);

    await Commodity.insertMany([
      { name: "Onion" },
      { name: "Tomato" },
      { name: "Wheat" },
      { name: "Grapes" },
      { name: "Maize" },
      { name: "Sugarcane" },
    ]);

    await MarketCommodity.insertMany([
      { marketName: "Lasalgaon APMC", commodityName: "Onion" },
      { marketName: "Lasalgaon APMC", commodityName: "Tomato" },
      { marketName: "Lasalgaon APMC", commodityName: "Grapes" },

      { marketName: "Yeola APMC", commodityName: "Onion" },
      { marketName: "Yeola APMC", commodityName: "Tomato" },

      { marketName: "Pune Market Yard", commodityName: "Wheat" },
      { marketName: "Pune Market Yard", commodityName: "Maize" },
      { marketName: "Pune Market Yard", commodityName: "Sugarcane" },

      { marketName: "Rahata APMC", commodityName: "Onion" },
      { marketName: "Rahata APMC", commodityName: "Maize" },
    ]);

    await MarketPriceDaily.insertMany([
      {
        stateCode: "MH",
        districtName: "Nashik",
        talukaName: "Niphad",
        marketName: "Lasalgaon APMC",
        commodityName: "Onion",
        variety: "Red",
        unit: "Quintal",
        arrival: 520,
        minPrice: 1900,
        modalPrice: 2100,
        maxPrice: 2200,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Nashik",
        talukaName: "Niphad",
        marketName: "Lasalgaon APMC",
        commodityName: "Tomato",
        variety: "Local",
        unit: "Quintal",
        arrival: 300,
        minPrice: 900,
        modalPrice: 1050,
        maxPrice: 1200,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Nashik",
        talukaName: "Niphad",
        marketName: "Lasalgaon APMC",
        commodityName: "Grapes",
        variety: "Table",
        unit: "Quintal",
        arrival: 180,
        minPrice: 2600,
        modalPrice: 2850,
        maxPrice: 3100,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Nashik",
        talukaName: "Yeola",
        marketName: "Yeola APMC",
        commodityName: "Onion",
        variety: "Red",
        unit: "Quintal",
        arrival: 430,
        minPrice: 1850,
        modalPrice: 2050,
        maxPrice: 2150,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Pune",
        talukaName: "Haveli",
        marketName: "Pune Market Yard",
        commodityName: "Wheat",
        variety: "Local",
        unit: "Quintal",
        arrival: 610,
        minPrice: 2200,
        modalPrice: 2350,
        maxPrice: 2480,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Pune",
        talukaName: "Haveli",
        marketName: "Pune Market Yard",
        commodityName: "Maize",
        variety: "Hybrid",
        unit: "Quintal",
        arrival: 350,
        minPrice: 1750,
        modalPrice: 1880,
        maxPrice: 1980,
        priceDate: "2026-03-15",
      },
      {
        stateCode: "MH",
        districtName: "Ahmednagar",
        talukaName: "Rahata",
        marketName: "Rahata APMC",
        commodityName: "Onion",
        variety: "Red",
        unit: "Quintal",
        arrival: 275,
        minPrice: 1800,
        modalPrice: 1980,
        maxPrice: 2080,
        priceDate: "2026-03-15",
      },
    ]);

    console.log("Maharashtra seed data inserted successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedMaharashtraData();