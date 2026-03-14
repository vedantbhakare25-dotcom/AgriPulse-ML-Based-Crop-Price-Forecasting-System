import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:5000";

function CropSelector({ onSelectionChange }) {
  const { t } = useTranslation();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [crops, setCrops] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState(false);

  useEffect(() => {
    setLoadingStates(true);
    fetch(`${API_BASE}/api/states`)
      .then((res) => res.json())
      .then((data) => setStates(data || []))
      .catch((err) => {
        console.error("failed to fetch states", err);
        setStates([]);
      })
      .finally(() => setLoadingStates(false));
  }, []);

  // reset district and crop when state changes
  useEffect(() => {
    setSelectedDistrict("");
    setSelectedCrop("");

    if (!selectedState) {
      setDistricts([]);
      return;
    }

    setLoadingDistricts(true);
    fetch(`${API_BASE}/api/districts?state=${encodeURIComponent(selectedState)}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data || []))
      .catch((err) => {
        console.error("failed to fetch districts", err);
        setDistricts([]);
      })
      .finally(() => setLoadingDistricts(false));
  }, [selectedState]);

  // reset crop when district changes
  useEffect(() => {
    setSelectedCrop("");

    if (!selectedDistrict) {
      setCrops([]);
      return;
    }

    setLoadingCrops(true);
    fetch(`${API_BASE}/api/crops?district=${encodeURIComponent(selectedDistrict)}`)
      .then((res) => res.json())
      .then((data) => setCrops(data || []))
      .catch((err) => {
        console.error("failed to fetch crops", err);
        setCrops([]);
      })
      .finally(() => setLoadingCrops(false));
  }, [selectedDistrict]);

  // helper to inform parent of selection
  const notifySelection = () => {
    if (onSelectionChange) {
      onSelectionChange({
        state: selectedState,
        district: selectedDistrict,
        crop: selectedCrop
      });
    }
  };

  // effect to notify parent whenever any selection changes
  useEffect(() => {
    notifySelection();
  }, [selectedState, selectedDistrict, selectedCrop]);

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{t("crop_selector.title")}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          {loadingStates ? (
            <div className="text-sm text-gray-500">{t("crop_selector.loading_states")}</div>
          ) : (
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">-- {t("crop_selector.state")} --</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          {loadingDistricts ? (
            <div className="text-sm text-gray-500">{t("crop_selector.loading_districts")}</div>
          ) : (
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">-- {t("crop_selector.district")} --</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crop
          </label>
          {loadingCrops ? (
            <div className="text-sm text-gray-500">{t("crop_selector.loading_crops")}</div>
          ) : (
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              disabled={!selectedDistrict}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">-- {t("crop_selector.crop")} --</option>
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropSelector;