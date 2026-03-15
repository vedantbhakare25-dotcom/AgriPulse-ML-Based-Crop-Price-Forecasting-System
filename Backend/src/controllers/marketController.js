import Market from "../models/Market.js";

export const getMarkets = async (req, res) => {
  try {
    const { districtName, talukaName, stateCode } = req.query;

    const filter = {};
    if (districtName) filter.districtName = districtName;
    if (talukaName) filter.talukaName = talukaName;
    if (stateCode) filter.stateCode = stateCode;

    const markets = await Market.find(filter).sort({ name: 1 });

    res.status(200).json(markets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch markets" });
  }
};