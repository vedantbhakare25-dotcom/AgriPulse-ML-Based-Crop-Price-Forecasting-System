import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchStates,
  fetchDistricts,
  fetchTalukas,
  fetchMarkets,
  fetchCommodities,
} from "../../services/api";

function CropSelector({ onSelectionChange }) {
  const { t } = useTranslation();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingMarkets, setLoadingMarkets] = useState(false);
  const [loadingCommodities, setLoadingCommodities] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoadingStates(true);
        const data = await fetchStates();
        setStates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load states:", error);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!selectedState) {
        setDistricts([]);
        return;
      }

      try {
        setLoadingDistricts(true);
        const data = await fetchDistricts(selectedState);
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load districts:", error);
        setDistricts([]);
      } finally {
        setLoadingDistricts(false);
      }
    };

    loadDistricts();
  }, [selectedState]);

  useEffect(() => {
    const loadTalukas = async () => {
      if (!selectedState || !selectedDistrict) {
        setTalukas([]);
        return;
      }

      try {
        setLoadingTalukas(true);
        const data = await fetchTalukas(selectedDistrict, selectedState);
        setTalukas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load talukas:", error);
        setTalukas([]);
      } finally {
        setLoadingTalukas(false);
      }
    };

    loadTalukas();
  }, [selectedState, selectedDistrict]);

  useEffect(() => {
    const loadMarkets = async () => {
      if (!selectedState || !selectedDistrict || !selectedTaluka) {
        setMarkets([]);
        return;
      }

      try {
        setLoadingMarkets(true);
        const data = await fetchMarkets(
          selectedDistrict,
          selectedTaluka,
          selectedState
        );
        setMarkets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load markets:", error);
        setMarkets([]);
      } finally {
        setLoadingMarkets(false);
      }
    };

    loadMarkets();
  }, [selectedState, selectedDistrict, selectedTaluka]);

  useEffect(() => {
    const loadCommodities = async () => {
      if (!selectedMarket) {
        setCommodities([]);
        return;
      }

      try {
        setLoadingCommodities(true);
        const data = await fetchCommodities(selectedMarket);
        setCommodities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load commodities:", error);
        setCommodities([]);
      } finally {
        setLoadingCommodities(false);
      }
    };

    loadCommodities();
  }, [selectedMarket]);

  useEffect(() => {
    if (!onSelectionChange) return;

    const payload = {
      stateCode: selectedState,
      districtName: selectedDistrict,
      talukaName: selectedTaluka,
      marketName: selectedMarket,
      commodityName: selectedCommodity,
    };

    console.log("Selection sent from CropSelector:", payload);
    onSelectionChange(payload);
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluka,
    selectedMarket,
    selectedCommodity,
    onSelectionChange,
  ]);

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedTaluka("");
    setSelectedMarket("");
    setSelectedCommodity("");
    setDistricts([]);
    setTalukas([]);
    setMarkets([]);
    setCommodities([]);
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setSelectedTaluka("");
    setSelectedMarket("");
    setSelectedCommodity("");
    setTalukas([]);
    setMarkets([]);
    setCommodities([]);
  };

  const handleTalukaChange = (e) => {
    const value = e.target.value;
    setSelectedTaluka(value);
    setSelectedMarket("");
    setSelectedCommodity("");
    setMarkets([]);
    setCommodities([]);
  };

  const handleMarketChange = (e) => {
    const value = e.target.value;
    setSelectedMarket(value);
    setSelectedCommodity("");
    setCommodities([]);
  };

  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("crop_selector.title")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {t("crop_selector.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.state")}
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">
              {loadingStates
                ? t("crop_selector.loading_states")
                : t("crop_selector.state_placeholder")}
            </option>
            {states.map((state) => (
              <option key={state._id} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.district")}
          </label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedState || loadingDistricts}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {loadingDistricts
                ? t("crop_selector.loading_districts")
                : t("crop_selector.district_placeholder")}
            </option>
            {districts.map((district) => (
              <option key={district._id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.taluka")}
          </label>
          <select
            value={selectedTaluka}
            onChange={handleTalukaChange}
            disabled={!selectedDistrict || loadingTalukas}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {loadingTalukas
                ? t("crop_selector.loading_talukas")
                : t("crop_selector.taluka_placeholder")}
            </option>
            {talukas.map((taluka) => (
              <option key={taluka._id} value={taluka.name}>
                {taluka.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.market")}
          </label>
          <select
            value={selectedMarket}
            onChange={handleMarketChange}
            disabled={!selectedTaluka || loadingMarkets}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {loadingMarkets
                ? t("crop_selector.loading_markets")
                : t("crop_selector.market_placeholder")}
            </option>
            {markets.map((market) => (
              <option key={market._id} value={market.name}>
                {market.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.crop")}
          </label>
          <select
            value={selectedCommodity}
            onChange={handleCommodityChange}
            disabled={!selectedMarket || loadingCommodities}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {loadingCommodities
                ? t("crop_selector.loading_crops")
                : t("crop_selector.crop_placeholder")}
            </option>
            {commodities.map((commodity) => (
              <option key={commodity._id} value={commodity.commodityName}>
                {commodity.commodityName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CropSelector;