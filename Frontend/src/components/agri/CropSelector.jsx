import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const STATES = ["Maharashtra", "Punjab", "Karnataka"];

const DISTRICTS_BY_STATE = {
  Maharashtra: ["Nashik", "Pune", "Nagpur"],
  Punjab: ["Ludhiana", "Amritsar"],
  Karnataka: ["Bengaluru Rural", "Mysuru"]
};

const CROPS_BY_DISTRICT = {
  Nashik: ["Onion", "Grapes", "Tomato"],
  Pune: ["Sugarcane", "Wheat"],
  Nagpur: ["Orange", "Cotton"],
  Ludhiana: ["Wheat", "Rice"],
  Amritsar: ["Maize", "Rice"],
  "Bengaluru Rural": ["Ragi", "Tomato"],
  Mysuru: ["Coffee", "Arecanut"]
};

function CropSelector({ onSelectionChange }) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  const districts = selectedState ? DISTRICTS_BY_STATE[selectedState] ?? [] : [];
  const crops = selectedDistrict ? CROPS_BY_DISTRICT[selectedDistrict] ?? [] : [];

  // reset district and crop when state changes
  useEffect(() => {
    setSelectedDistrict("");
    setSelectedCrop("");
  }, [selectedState]);

  // reset crop when district changes
  useEffect(() => {
    setSelectedCrop("");
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
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="">-- {t("crop_selector.state")} --</option>
            {STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crop
          </label>
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
        </div>
      </div>
    </div>
  );
}

export default CropSelector;