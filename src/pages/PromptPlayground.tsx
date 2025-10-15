import { useState } from "react";
import { useCampaignStore } from "../store/useCampaignStore";

export default function PromptPlayground() {
  const { campaigns } = useCampaignStore();
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState(campaigns);

  const handlePrompt = () => {
    let res = [...campaigns];
    const lower = prompt.toLowerCase();

    if (lower.includes("ctr") || lower.includes("click through")) {
      res = [...res].sort((a, b) => b.ctr - a.ctr);
    } else if (lower.includes("conversion") || lower.includes("conversions")) {
      res = [...res].sort((a, b) => b.conversions - a.conversions);
    } else if (lower.includes("impression") || lower.includes("views")) {
      res = [...res].sort((a, b) => b.impressions - a.impressions);
    } else if (lower.includes("clicks") || lower.includes("click")) {
      res = [...res].sort((a, b) => b.clicks - a.clicks);
    } else if (lower.includes("paused") || lower.includes("stop")) {
      res = res.filter((c) => c.status === "Paused");
    } else if (lower.includes("active") || lower.includes("running")) {
      res = res.filter((c) => c.status === "Active");
    } else if (lower.includes("best") || lower.includes("top")) {
      const best = res.reduce((p, c) => {
        const pScore = p.ctr * 0.6 + p.conversions * 0.4;
        const cScore = c.ctr * 0.6 + c.conversions * 0.4;
        return cScore > pScore ? c : p;
      }, res[0]);
      res = [best];
    } else if (lower.includes("poor") || lower.includes("low")) {
      res = [...res].sort((a, b) => a.ctr - b.ctr).slice(0, 5);
    } else if (lower.includes("inefficient") || lower.includes("waste")) {
      res = res.filter((c) => c.impressions > 30000 && c.conversions < 100);
    } else {
      res = campaigns;
    }

    setResults(res);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
          Prompt Playground
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="💬 Type something like 'Show top campaigns by CTR'"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
          <button
            onClick={handlePrompt}
            className="bg-blue-600 text-white font-medium rounded-md px-5 py-2 hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            Run
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="hidden sm:table w-full border-collapse border border-gray-200 rounded-md">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="p-3 text-left">Campaign</th>
                <th className="p-3 text-center">CTR (%)</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((c) => (
                <tr
                  key={c.id}
                  className="border-t text-sm text-center hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-left font-medium text-gray-800">
                    {c.name}
                  </td>
                  <td className="p-3 text-blue-600 font-medium">{c.ctr}</td>
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

          <div className="sm:hidden space-y-3">
            {results.map((c) => (
              <div
                key={c.id}
                className="border border-gray-200 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-gray-800">
                    {c.name}
                  </h3>
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
                <p className="text-sm text-gray-700">
                  CTR:{" "}
                  <span className="text-blue-600 font-medium">{c.ctr}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {results.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm italic">
            No campaigns match your query.
          </div>
        )}
      </section>
    </main>
  );
}
