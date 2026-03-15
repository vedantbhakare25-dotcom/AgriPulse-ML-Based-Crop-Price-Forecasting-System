import { useTranslation } from "react-i18next";
import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import MandiTable from "../components/agri/MandiTable";
import PriceChart from "../components/agri/PriceChart";
import InsightPanel from "../components/agri/InsightPanel";

function MarketDashboard() {
  const { t } = useTranslation();

  const staticMarketData = [
    { mandi: "Lasalgaon", price: 2100, arrival: 520, distance: 18 },
    { mandi: "Pimpalgaon", price: 2050, arrival: 430, distance: 24 },
    { mandi: "Nashik City", price: 1980, arrival: 300, distance: 12 },
  ];

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
              value={2100}
            />

            <ForecastCard
              title={t("market_dashboard.cards.average_price")}
              value={1870}
            />

            <ForecastCard
              title={t("market_dashboard.cards.seven_day_forecast")}
              value={1950}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.nearby_prices")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <MandiTable data={staticMarketData} />
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