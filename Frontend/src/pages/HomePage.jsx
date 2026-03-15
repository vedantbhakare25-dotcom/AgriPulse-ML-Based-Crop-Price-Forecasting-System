import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";

function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {t("home.badge")}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              {t("app_name")}
            </h1>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-xl">
              {t("home.subtitle")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/markets")}
                className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold shadow-sm transition hover:bg-green-700"
              >
                {t("select_crop")}
              </button>

              <button
                onClick={() => navigate("/forecast")}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-gray-800 font-semibold shadow-sm transition hover:bg-gray-50"
              >
                {t("home.view_forecast")}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                <p className="text-sm text-gray-500">
                  {t("home.cards.markets_tracked")}
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {t("home.cards.markets_tracked_value")}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                <p className="text-sm text-gray-500">
                  {t("home.cards.crop_insights")}
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {t("home.cards.crop_insights_value")}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                <p className="text-sm text-gray-500">
                  {t("home.cards.forecast_window")}
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {t("home.cards.forecast_window_value")}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 md:p-8">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {t("home.preview.best_market_price")}
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                      ₹{formatNumber(2100, i18n.language)}
                    </p>
                  </div>

                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 17l6-6 4 4 8-8"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-sm text-gray-500">
                    {t("home.preview.national_avg_price")}
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    ₹{formatNumber(1870, i18n.language)}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-sm text-gray-500">
                    {t("home.preview.market_trend")}
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    {t("home.preview.upward")}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4">
                <p className="text-sm font-medium text-gray-700">
                  {t("home.preview.ai_insight")}
                </p>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t("home.preview.ai_insight_text")}
                </p>
              </div>
            </div>

            <div className="absolute -z-10 -top-6 -right-6 h-32 w-32 rounded-full bg-green-100 blur-2xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 h-40 w-40 rounded-full bg-orange-100 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;