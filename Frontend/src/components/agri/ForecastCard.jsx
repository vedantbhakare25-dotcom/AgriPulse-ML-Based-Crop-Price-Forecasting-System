import { useTranslation } from "react-i18next";
import { formatNumber } from "../../utils/formatNumber";

function ForecastCard({ title, value }) {
  const { i18n } = useTranslation();

  const displayValue =
    typeof value === "number"
      ? formatNumber(value, i18n.language)
      : value;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{displayValue}</p>
    </div>
  );
}

export default ForecastCard;