import MarketPriceDaily from "../models/MarketPriceDaily.js";
import { engineerFeatures } from "../services/recommendation/featureEngineering.js";
import { rankMarkets } from "../services/recommendation/scoringEngine.js";
import { DEFAULT_MARKET_FEES_PERCENT } from "../services/recommendation/config.js";

export const getRecommendation = async (req, res) => {
  try {
    const { districtName, commodityName, quantity, fuelCostPerKm, marketFeePercent } = req.query;

    if (!districtName || !commodityName) {
      return res.status(400).json({ message: "districtName and commodityName are required." });
    }

    // Fetch all records for the district and commodity to calculate features over time
    const prices = await MarketPriceDaily.find({
      districtName,
      commodityName
    });

    if (!prices || prices.length === 0) {
      return res.status(404).json({ message: "No price data found for the given criteria." });
    }

    // 1. Feature Engineering
    const features = engineerFeatures(prices, commodityName);

    // 2. Model Scoring & Ranking
    const q = quantity ? parseFloat(quantity) : 50;
    const f = fuelCostPerKm ? parseFloat(fuelCostPerKm) : 12;
    const m = marketFeePercent ? parseFloat(marketFeePercent) : DEFAULT_MARKET_FEES_PERCENT;

    const rankedMarkets = rankMarkets(features, q, f, m);

    res.status(200).json({
      inputs: {
        districtName,
        commodityName,
        quantity: q,
        fuelCostPerKm: f,
        marketFeePercent: m
      },
      recommendedMarket: rankedMarkets[0] || null,
      ranking: rankedMarkets
    });
    
  } catch (error) {
    console.error("Recommendation fetch error:", error);
    res.status(500).json({ message: "Failed to generate recommendations." });
  }
};
