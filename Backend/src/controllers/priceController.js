import MarketPriceDaily from "../models/MarketPriceDaily.js";

export const getPrices = async (req, res) => {
  try {
    const { marketName, commodityName, districtName, talukaName, priceDate } =
      req.query;

    const filter = {};

    if (marketName) filter.marketName = marketName;
    if (commodityName) filter.commodityName = commodityName;
    if (districtName) filter.districtName = districtName;
    if (talukaName) filter.talukaName = talukaName;
    if (priceDate) filter.priceDate = priceDate;

    const prices = await MarketPriceDaily.find(filter).sort({
      priceDate: -1,
      marketName: 1,
    });

    res.status(200).json(prices);
  } catch (error) {
    console.error("Price fetch error:", error);
    res.status(500).json({ message: "Failed to fetch prices" });
  }
};
