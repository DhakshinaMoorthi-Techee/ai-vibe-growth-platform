import { useEffect, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { CampaignChart } from "../components/CampaignChart";
import { CampaignTable } from "../components/CampaignTable";
import { SkeletonLoader } from "../components/SkeletonLoader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Marketing Dashboard
          </h1>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="mb-5">
              <FilterBar />
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Performance Trends
              </h2>
              <CampaignChart />
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Campaign Overview
              </h2>
              <CampaignTable />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
