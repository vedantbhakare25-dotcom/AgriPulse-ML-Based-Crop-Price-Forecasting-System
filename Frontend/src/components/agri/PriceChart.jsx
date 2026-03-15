import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatNumber } from "../../utils/formatNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function PriceChart() {
  const { t, i18n } = useTranslation();

  const labels = t("price_chart.day_labels", { returnObjects: true });

  const values = [1980, 2020, 2050, 2010, 2080, 2120, 2160];

  const data = {
    labels,
    datasets: [
      {
        label: t("price_chart.predicted_price"),
        data: values,
        borderColor: "#2F855A",
        backgroundColor: "rgba(47,133,90,0.12)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = formatNumber(context.parsed.y, i18n.language);
            return `${t("price_chart.price_label")}: ₹${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `₹${formatNumber(value, i18n.language)}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Line data={data} options={options} />
    </div>
  );
}

export default PriceChart;