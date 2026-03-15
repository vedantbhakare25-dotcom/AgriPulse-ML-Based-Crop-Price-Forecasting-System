import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import MandiTable from "../components/agri/MandiTable";
import PriceChart from "../components/agri/PriceChart";
import InsightPanel from "../components/agri/InsightPanel";

import { LocationContext } from "../context/LocationContext";
import { fetchPrices } from "../services/api";

function MarketDashboard() {
  const { t } = useTranslation();
  const locationContext = useContext(LocationContext);

  const market = locationContext?.market;
  const crop = locationContext?.crop;

  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPrices = async () => {
      if (!market || !crop) {
        setMarketData([]);
        return;
      }

      try {
        setLoading(true);

        const prices = await fetchPrices(market, crop);

        const formatted = prices.map((item) => ({
          mandi: item.marketName,
          price: item.modalPrice,
          arrival: item.arrival,
          distance: 0,
        }));

        setMarketData(formatted);
      } catch (error) {
        console.error("Failed to fetch market prices:", error);
        setMarketData([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, [market, crop]);

  const bestPrice =
    marketData.length > 0
      ? Math.max(...marketData.map((m) => m.price))
      : 0;

  const avgPrice =
    marketData.length > 0
      ? Math.round(
          marketData.reduce((sum, m) => sum + m.price, 0) /
            marketData.length
        )
      : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <CropSelector />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.summary")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ForecastCard
              title={t("market_dashboard.cards.best_market_price")}
              value={bestPrice}
            />

            <ForecastCard
              title={t("market_dashboard.cards.average_price")}
              value={avgPrice}
            />

            <ForecastCard
              title={t("market_dashboard.cards.seven_day_forecast")}
              value={avgPrice}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.nearby_prices")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <p className="text-gray-500 text-sm">
                {t("market_dashboard.loading_prices")}
              </p>
            ) : (
              <MandiTable data={marketData} />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.price_trend")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <PriceChart />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.ai_insights")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <InsightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketDashboard;