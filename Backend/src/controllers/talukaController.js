import Taluka from "../models/Taluka.js";

export const getTalukas = async (req, res) => {
  try {
    const { districtName, stateCode } = req.query;

    const filter = {};
    if (districtName) filter.districtName = districtName;
    if (stateCode) filter.stateCode = stateCode;

    const talukas = await Taluka.find(filter).sort({ name: 1 });

    res.status(200).json(talukas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch talukas" });
  }
};