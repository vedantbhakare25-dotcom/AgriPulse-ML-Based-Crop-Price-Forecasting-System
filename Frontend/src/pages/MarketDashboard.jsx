import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import MandiTable from "../components/agri/MandiTable";
import PriceChart from "../components/agri/PriceChart";
import InsightPanel from "../components/agri/InsightPanel";

import { fetchPrices } from "../services/api";

function MarketDashboard() {
  const { t } = useTranslation();

  const [selection, setSelection] = useState({
    stateCode: "",
    districtName: "",
    talukaName: "",
    marketName: "",
    commodityName: "",
  });

  const [marketData, setMarketData] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    const loadDistrictComparison = async () => {
      if (!selection.districtName || !selection.commodityName) {
        setMarketData([]);
        return;
      }

      try {
        setLoadingTable(true);

        const prices = await fetchPrices({
          districtName: selection.districtName,
          commodityName: selection.commodityName,
        });

        const safePrices = Array.isArray(prices) ? prices : [];

        // Keep only latest row per market for comparison table
        const latestByMarket = new Map();

        for (const item of safePrices) {
          const existing = latestByMarket.get(item.marketName);

          if (!existing || item.priceDate > existing.priceDate) {
            latestByMarket.set(item.marketName, item);
          }
        }

        const formattedTableData = Array.from(latestByMarket.values()).map(
          (item) => ({
            mandi: item.marketName,
            price: item.modalPrice,
            arrival: item.arrival,
            distance: 0,
            priceDate: item.priceDate,
          })
        );

        setMarketData(formattedTableData);
      } catch (error) {
        console.error("Failed to fetch district comparison prices:", error);
        setMarketData([]);
      } finally {
        setLoadingTable(false);
      }
    };

    loadDistrictComparison();
  }, [selection.districtName, selection.commodityName]);

  useEffect(() => {
    const loadMarketHistory = async () => {
      if (!selection.marketName || !selection.commodityName) {
        setPriceHistory([]);
        return;
      }

      try {
        setLoadingChart(true);

        const prices = await fetchPrices({
          marketName: selection.marketName,
          commodityName: selection.commodityName,
        });

        const safePrices = Array.isArray(prices) ? prices : [];
        setPriceHistory(safePrices);
      } catch (error) {
        console.error("Failed to fetch market history:", error);
        setPriceHistory([]);
      } finally {
        setLoadingChart(false);
      }
    };

    loadMarketHistory();
  }, [selection.marketName, selection.commodityName]);

  const summary = useMemo(() => {
    if (marketData.length === 0) {
      return {
        bestPrice: 0,
        averagePrice: 0,
        forecastPrice: 0,
      };
    }

    const prices = marketData.map((item) => item.price);
    const bestPrice = Math.max(...prices);
    const averagePrice = Math.round(
      prices.reduce((sum, price) => sum + price, 0) / prices.length
    );

    return {
      bestPrice,
      averagePrice,
      forecastPrice: averagePrice,
    };
  }, [marketData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <CropSelector onSelectionChange={setSelection} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.summary")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ForecastCard
              title={t("market_dashboard.cards.best_market_price")}
              value={summary.bestPrice}
            />

            <ForecastCard
              title={t("market_dashboard.cards.average_price")}
              value={summary.averagePrice}
            />

            <ForecastCard
              title={t("market_dashboard.cards.seven_day_forecast")}
              value={summary.forecastPrice}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.nearby_prices")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <MandiTable data={marketData} loading={loadingTable} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("market_dashboard.price_trend")}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {loadingChart ? (
              <p className="text-gray-500 text-sm">
                {t("market_dashboard.loading_prices")}
              </p>
            ) : (
              <PriceChart dataPoints={priceHistory} />
            )}
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