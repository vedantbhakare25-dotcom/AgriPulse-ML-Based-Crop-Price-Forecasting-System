import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MarketDashboard from "../pages/MarketDashboard";
import ForecastDashboard from "../pages/ForecastDashboard";
import CropSelectionPage from "../features/crops/CropSelectionPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<MarketDashboard />} />
      <Route path="/markets" element={<MarketDashboard />} />
      <Route path="/forecast" element={<ForecastDashboard />} />
      <Route path="/crops" element={<CropSelectionPage />} />
    </Routes>
  );
}