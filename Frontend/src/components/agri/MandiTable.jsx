import { useTranslation } from "react-i18next";
import { formatNumber, formatCurrency } from "../../utils/formatNumber";

function MandiTable({ data = [], loading = false }) {
  const { t, i18n } = useTranslation();

  const bestPrice =
    data.length > 0 ? Math.max(...data.map((row) => row.price)) : null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t("mandi_table.mandi")}
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t("mandi_table.price")}
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t("mandi_table.arrival")}
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t("mandi_table.distance")}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                {t("mandi_table.loading")}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                {t("mandi_table.empty")}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const isBestPrice = row.price === bestPrice;

              return (
                <tr
                  key={`${row.mandi}-${index}`}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {formatNumber(index + 1, i18n.language)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-sm font-semibold text-green-700">
                        {row.mandi.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {row.mandi}
                        </p>

                        {isBestPrice && (
                          <span className="inline-block mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            {t("mandi_table.best_price")}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`text-sm font-bold ${
                        isBestPrice ? "text-green-700" : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(row.price, i18n.language)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                    {formatNumber(row.arrival, i18n.language)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                    {formatNumber(row.distance, i18n.language)} {t("common.km")}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MandiTable;
