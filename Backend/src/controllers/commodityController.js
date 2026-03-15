import MarketCommodity from "../models/MarketCommodity.js";

export const getCommodities = async (req, res) => {
  try {
    const { marketName } = req.query;

    const filter = {};
    if (marketName) filter.marketName = marketName;

    const commodities = await MarketCommodity.find(filter).sort({ commodityName: 1 });

    res.status(200).json(commodities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch commodities" });
  }
};