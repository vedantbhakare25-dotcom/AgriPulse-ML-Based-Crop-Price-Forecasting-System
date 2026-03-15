import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LocationContext } from "../../context/LocationContext";

function CropSelector() {
  const { t } = useTranslation();
  const locationContext = useContext(LocationContext);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  const setGlobalState = locationContext?.setState;
  const setGlobalDistrict = locationContext?.setDistrict;
  const setGlobalCrop = locationContext?.setCrop;

  const states = ["Maharashtra", "Punjab", "Karnataka"];

  const districtsByState = {
    Maharashtra: ["Nashik", "Pune", "Nagpur"],
    Punjab: ["Ludhiana", "Amritsar"],
    Karnataka: ["Bengaluru Rural", "Mysuru"],
  };

  const cropsByDistrict = {
    Nashik: ["Onion", "Grapes", "Tomato"],
    Pune: ["Sugarcane", "Wheat"],
    Nagpur: ["Orange", "Cotton"],
    Ludhiana: ["Wheat", "Rice"],
    Amritsar: ["Maize", "Rice"],
    "Bengaluru Rural": ["Ragi", "Tomato"],
    Mysuru: ["Coffee", "Arecanut"],
  };

  const districts = selectedState ? districtsByState[selectedState] || [] : [];
  const crops = selectedDistrict ? cropsByDistrict[selectedDistrict] || [] : [];

  const handleStateChange = (e) => {
    const value = e.target.value;

    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedCrop("");

    setGlobalState?.(value);
    setGlobalDistrict?.("");
    setGlobalCrop?.("");
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;

    setSelectedDistrict(value);
    setSelectedCrop("");

    setGlobalDistrict?.(value);
    setGlobalCrop?.("");
  };

  const handleCropChange = (e) => {
    const value = e.target.value;

    setSelectedCrop(value);
    setGlobalCrop?.(value);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.state")}
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">{t("crop_selector.state_placeholder")}</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
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
            disabled={!selectedState}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">{t("crop_selector.district_placeholder")}</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("crop_selector.crop")}
          </label>
          <select
            value={selectedCrop}
            onChange={handleCropChange}
            disabled={!selectedDistrict}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">{t("crop_selector.crop_placeholder")}</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CropSelector;