import dotenv from "dotenv";
import mongoose from "mongoose";
import https from "https";
import connectDB from "../config/db.js";
import { normalizeDistrict, normalizeMarket, normalizeCommodity } from "../utils/normalizeNames.js";
import Market from "../models/Market.js";
import Commodity from "../models/Commodity.js";
import MarketCommodity from "../models/MarketCommodity.js";
import MarketPriceDaily from "../models/MarketPriceDaily.js";

dotenv.config();

// Official Data.Gov.In Daily Mandi Price API (AGMARKNET feed)
const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
const URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=3000&filters[state]=Maharashtra`;

function fetchRealData() {
  return new Promise((resolve, reject) => {
    https.get(URL, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.records || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

const importPrices = async () => {
  try {
    await connectDB();
    console.log("Fetching Real-time AGMARKNET Prices for Maharashtra...");
    
    const rawRecords = await fetchRealData();
    console.log(`Fetched ${rawRecords.length} live price records today.`);
    
    if (rawRecords.length === 0) {
      console.log("No records found for today.");
      process.exit(0);
    }
    
    const marketsToUpsert = new Map();
    const commoditiesToUpsert = new Set();
    const marketCommodityLinks = new Set();
    const validPricesToUpsert = [];
    
    // Process and normalize feeds
    for (const raw of rawRecords) {
      if (!raw.market || !raw.commodity || !raw.modal_price) continue;
      
      const normDistrict = normalizeDistrict(raw.district);
      const normMarket = normalizeMarket(raw.market);
      const normCommodity = normalizeCommodity(raw.commodity);
      
      // Auto-discover Sub-markets automatically (Like Sanvatsar, Shirasgaon, etc)
      if (!marketsToUpsert.has(normMarket)) {
        marketsToUpsert.set(normMarket, {
          name: normMarket,
          districtName: normDistrict,
          talukaName: normMarket.replace(" APMC", ""), // Defaulting sub-market village to its taluka map to prevent orphan crashes
          stateCode: "MH",
          marketType: "APMC" 
        });
      }
      
      commoditiesToUpsert.add(normCommodity);
      marketCommodityLinks.add(`${normMarket}|${normCommodity}`);
      
      // Format DD/MM/YYYY into YYYY-MM-DD
      const dateParts = raw.arrival_date.split("/");
      const isoDate = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : raw.arrival_date;
      
      validPricesToUpsert.push({
        stateCode: "MH",
        districtName: normDistrict,
        talukaName: marketsToUpsert.get(normMarket).talukaName,
        marketName: normMarket,
        commodityName: normCommodity,
        variety: raw.variety || "Other",
        unit: "Quintal",
        arrival: 0, 
        minPrice: raw.min_price || raw.modal_price,
        modalPrice: raw.modal_price,
        maxPrice: raw.max_price || raw.modal_price,
        priceDate: isoDate
      });
    }
    
    console.log("Upserting Dynamically Extracted Markets & Sub-Markets...");
    const marketOps = Array.from(marketsToUpsert.values()).map(m => ({
      updateOne: {
        filter: { name: m.name, districtName: m.districtName, stateCode: "MH" },
        update: { $set: m },
        upsert: true
      }
    }));
    if (marketOps.length > 0) await Market.bulkWrite(marketOps);
    
    console.log("Upserting Commodities & Market Relations...");
    const commOps = Array.from(commoditiesToUpsert).map(c => ({
      updateOne: { filter: { name: c }, update: { $set: { name: c } }, upsert: true }
    }));
    if (commOps.length > 0) await Commodity.bulkWrite(commOps);
    
    const linkOps = Array.from(marketCommodityLinks).map(link => {
      const [m, c] = link.split("|");
      return {
        updateOne: { filter: { marketName: m, commodityName: c }, update: { $set: { marketName: m, commodityName: c } }, upsert: true }
      };
    });
    if (linkOps.length > 0) await MarketCommodity.bulkWrite(linkOps);
    
    console.log("Upserting Live Daily Prices...");
    const priceOps = validPricesToUpsert.map(p => ({
      updateOne: {
        filter: { marketName: p.marketName, commodityName: p.commodityName, variety: p.variety, priceDate: p.priceDate },
        update: { $set: p },
        upsert: true
      }
    }));
    
    if (priceOps.length > 0) {
      const pResult = await MarketPriceDaily.bulkWrite(priceOps);
      console.log(`Live Prices imported successfully. Upserted/Modified: ${pResult.upsertedCount + pResult.modifiedCount}`);
    }
    
    console.log("Live Integration complete.");
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Live fetch pipeline failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

importPrices();
