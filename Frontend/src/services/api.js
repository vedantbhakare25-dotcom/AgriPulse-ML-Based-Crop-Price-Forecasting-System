const API_BASE_URL = "http://localhost:5000/api";

export async function fetchStates() {
  const res = await fetch(`${API_BASE_URL}/states`);
  return res.json();
}

export async function fetchDistricts(stateCode) {
  const res = await fetch(`${API_BASE_URL}/districts?stateCode=${stateCode}`);
  return res.json();
}

export async function fetchTalukas(districtName, stateCode) {
  const res = await fetch(
    `${API_BASE_URL}/talukas?districtName=${encodeURIComponent(
      districtName
    )}&stateCode=${stateCode}`
  );
  return res.json();
}

export async function fetchMarkets(districtName, talukaName, stateCode) {
  const res = await fetch(
    `${API_BASE_URL}/markets?districtName=${encodeURIComponent(
      districtName
    )}&talukaName=${encodeURIComponent(talukaName)}&stateCode=${stateCode}`
  );
  return res.json();
}

export async function fetchCommodities(marketName) {
  const res = await fetch(
    `${API_BASE_URL}/commodities?marketName=${encodeURIComponent(marketName)}`
  );
  return res.json();
}

export async function fetchPrices({
  marketName,
  districtName,
  commodityName,
}) {
  const params = new URLSearchParams();

  if (marketName) params.append("marketName", marketName);
  if (districtName) params.append("districtName", districtName);
  if (commodityName) params.append("commodityName", commodityName);

  const res = await fetch(`${API_BASE_URL}/prices?${params.toString()}`);
  return res.json();
}