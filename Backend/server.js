const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const STATES = ["Maharashtra", "Punjab", "Karnataka"];

const DISTRICTS_BY_STATE = {
  Maharashtra: ["Nashik", "Pune", "Nagpur"],
  Punjab: ["Ludhiana", "Amritsar"],
  Karnataka: ["Bengaluru Rural", "Mysuru"],
};

const CROPS_BY_DISTRICT = {
  Nashik: ["Onion", "Grapes", "Tomato"],
  Pune: ["Sugarcane", "Wheat"],
  Nagpur: ["Orange", "Cotton"],
  Ludhiana: ["Wheat", "Rice"],
  Amritsar: ["Maize", "Rice"],
  "Bengaluru Rural": ["Ragi", "Tomato"],
  Mysuru: ["Coffee", "Arecanut"],
};

const MARKET_RECORDS = [
  {
    state: "Maharashtra",
    district: "Nashik",
    crop: "Onion",
    mandi: "Lasalgaon",
    price: 2100,
    arrival: 520,
    distance: 18,
  },
  {
    state: "Maharashtra",
    district: "Nashik",
    crop: "Grapes",
    mandi: "Pimpalgaon",
    price: 3200,
    arrival: 280,
    distance: 24,
  },
  {
    state: "Punjab",
    district: "Ludhiana",
    crop: "Wheat",
    mandi: "Ludhiana Mandi",
    price: 2300,
    arrival: 600,
    distance: 10,
  },
  {
    state: "Karnataka",
    district: "Mysuru",
    crop: "Arecanut",
    mandi: "Mysuru APMC",
    price: 2500,
    arrival: 310,
    distance: 8,
  },
];

app.get("/api/states", (req, res) => {
  res.json(STATES);
});

app.get("/api/districts", (req, res) => {
  const { state } = req.query;
  const districts = DISTRICTS_BY_STATE[state] || [];
  res.json(districts);
});

app.get("/api/crops", (req, res) => {
  const { district } = req.query;
  const crops = CROPS_BY_DISTRICT[district] || [];
  res.json(crops);
});

app.get("/api/markets", (req, res) => {
  const { state, district, crop } = req.query;
  console.log("Markets route hit:", { state, district, crop });
  const filtered = MARKET_RECORDS.filter(
    (record) =>
      record.state === state &&
      record.district === district &&
      record.crop === crop,
  );
  const result = filtered.map(({ mandi, price, arrival, distance }) => ({
    mandi,
    price,
    arrival,
    distance,
  }));
  res.json(result);
});

console.log("Loaded correct Backend/server.js");

app.listen(PORT, () => {
  console.log(`AgriPulse API running on port ${PORT}`);
});
