import { useTranslation } from "react-i18next";
import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import PriceChart from "../components/agri/PriceChart";
import InsightPanel from "../components/agri/InsightPanel";

function ForecastDashboard() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("forecast_dashboard.title")}
          </h1>

          <p className="text-gray-500 mt-2">
            {t("forecast_dashboard.subtitle")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <CropSelector />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("forecast_dashboard.summary")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ForecastCard
              title={t("forecast_dashboard.cards.tomorrow_price")}
              value={2120}
            />

            <ForecastCard
              title={t("forecast_dashboard.cards.seven_day_average")}
              value={2080}
            />

            <ForecastCard
              title={t("forecast_dashboard.cards.trend")}
              value={t("forecast_dashboard.cards.trend_upward")}
            />

            <ForecastCard
              title={t("forecast_dashboard.cards.confidence")}
              value="82%"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("forecast_dashboard.trend")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <PriceChart />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("forecast_dashboard.ai_insight")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <InsightPanel />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("forecast_dashboard.recommendation")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("forecast_dashboard.suggested_action")}
            </h3>

            <p className="text-gray-600 mt-2">
              {t("forecast_dashboard.suggested_action_text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastDashboard;