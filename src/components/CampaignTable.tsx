import { useCampaignStore } from "../store/useCampaignStore";

export const CampaignTable = () => {
  const { filtered } = useCampaignStore();

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left font-semibold">Campaign</th>
              <th className="p-3 text-center font-semibold">Impressions</th>
              <th className="p-3 text-center font-semibold">Clicks</th>
              <th className="p-3 text-center font-semibold">CTR (%)</th>
              <th className="p-3 text-center font-semibold">Conversions</th>
              <th className="p-3 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="text-center text-sm hover:bg-gray-50 border-t transition-colors duration-150"
              >
                <td className="p-3 text-left font-medium text-gray-800">
                  {c.name}
                </td>
                <td className="p-3 text-gray-600">
                  {c.impressions.toLocaleString()}
                </td>
                <td className="p-3 text-gray-600">{c.clicks}</td>
                <td className="p-3 text-blue-600 font-medium">{c.ctr}%</td>
                <td className="p-3 text-gray-700 font-medium">
                  {c.conversions}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-4 flex flex-col gap-2 hover:bg-gray-50 transition-all duration-150"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{c.name}</span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                  c.status === "Active"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
              <span>Impressions:</span>
              <span className="text-right font-medium">
                {c.impressions.toLocaleString()}
              </span>

              <span>Clicks:</span>
              <span className="text-right font-medium">{c.clicks}</span>

              <span>CTR (%):</span>
              <span className="text-right font-medium text-blue-600">
                {c.ctr}
              </span>

              <span>Conversions:</span>
              <span className="text-right font-medium">{c.conversions}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-6 text-center text-gray-500 text-sm">
          No campaigns found.
        </div>
      )}
    </div>
  );
};
