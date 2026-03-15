import State from "../models/State.js";

export const getStates = async (req, res) => {
  try {
    const states = await State.find({}).sort({ name: 1 });
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch states" });
  }
};