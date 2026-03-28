/**
 * Normalizes standard names to prevent mapping errors across disparate datasets.
 */

const DISTRICT_MAP = {
  ahmadnagar: "Ahmednagar",
  raigarh: "Raigad",
  buldana: "Buldhana",
  gondiya: "Gondia",
  poona: "Pune",
  mumbai: "Mumbai City",
  "mumbai (suburban)": "Mumbai Suburban",
};

const MARKET_MAP = {
  lasalgaon: "Lasalgaon APMC",
  pimpalgaon: "Pimpalgaon APMC",
  "pune (khadki)": "Pune APMC",
  pune: "Pune APMC",
  nagar: "Nagar Market Yard",
  shrirampur: "Shrirampur APMC",
  rahata: "Rahata APMC",
  kopargaon: "Kopargaon APMC",
};

const COMMODITY_MAP = {
  "bhajipala": "Vegetables",
  "kanda": "Onion",
  "batata": "Potato",
  "lasun": "Garlic",
};

function toTitleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

export function normalizeDistrict(name) {
  if (!name) return "";
  let clean = name.trim().toLowerCase();
  if (DISTRICT_MAP[clean]) return DISTRICT_MAP[clean];
  return toTitleCase(clean);
}

export function normalizeTaluka(name) {
  if (!name) return "";
  return toTitleCase(name.trim().toLowerCase());
}

export function normalizeMarket(name) {
  if (!name) return "";
  let clean = name.trim().toLowerCase();
  
  if (MARKET_MAP[clean]) return MARKET_MAP[clean];
  
  // Auto-append APMC if missing to match schema if it's a raw town name
  if (!clean.includes("apmc") && !clean.includes("market") && !clean.includes("yard")) {
    clean += " apmc"; 
  }
  
  return toTitleCase(clean).replace(/Apmc/g, "APMC");
}

export function normalizeCommodity(name) {
  if (!name) return "";
  let clean = name.trim().toLowerCase();
  if (COMMODITY_MAP[clean]) return COMMODITY_MAP[clean];
  return toTitleCase(clean);
}
