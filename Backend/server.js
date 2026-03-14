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
  Karnataka: ["Bengaluru Rural", "Mysuru"]
};

const CROPS_BY_DISTRICT = {
  Nashik: ["Onion", "Grapes", "Tomato"],
  Pune: ["Sugarcane", "Wheat"],
  Nagpur: ["Orange", "Cotton"],
  Ludhiana: ["Wheat", "Rice"],
  Amritsar: ["Maize", "Rice"],
  "Bengaluru Rural": ["Ragi", "Tomato"],
  Mysuru: ["Coffee", "Arecanut"]
};

const MARKETS_BY_DISTRICT = {
  Nashik: [
    { mandi: "Lasalgaon", price: 2100, arrival: 520, distance: 18 },
    { mandi: "Pimpalgaon", price: 2050, arrival: 430, distance: 24 },
    { mandi: "Nashik City", price: 1980, arrival: 300, distance: 12 }
  ],
  Ludhiana: [
    { mandi: "Ludhiana Mandi", price: 2300, arrival: 600, distance: 10 },
    { mandi: "Khanna", price: 2250, arrival: 540, distance: 28 },
    { mandi: "Samrala", price: 2200, arrival: 400, distance: 22 }
  ],
  Mysuru: [
    { mandi: "Mysuru APMC", price: 2500, arrival: 310, distance: 8 },
    { mandi: "Nanjangud", price: 2450, arrival: 280, distance: 20 },
    { mandi: "Mandya", price: 2400, arrival: 350, distance: 45 }
  ]
};

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
  const markets = MARKETS_BY_DISTRICT[district] || [];
  res.json(markets);
});

console.log("Loaded correct Backend/server.js");

app.listen(PORT, () => {
  console.log(`AgriPulse API running on port ${PORT}`);
});