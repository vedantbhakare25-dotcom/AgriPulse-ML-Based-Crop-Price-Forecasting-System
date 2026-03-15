import District from "../models/District.js";

export const getDistricts = async (req, res) => {
  try {
    const { stateCode } = req.query;

    const filter = stateCode ? { stateCode } : {};

    const districts = await District.find(filter).sort({ name: 1 });

    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch districts" });
  }
};