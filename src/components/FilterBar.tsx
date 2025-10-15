import { useCampaignStore } from "../store/useCampaignStore";
import { useState } from "react";
import clsx from "clsx";

export const FilterBar = () => {
  const { setFilter, reset } = useCampaignStore();
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilter = (status: string) => {
    setActiveFilter(status);
    setFilter(status);
  };

  return (
    <div className="flex flex-wrap justify-start md:justify-between items-center gap-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {["All", "Active", "Paused"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer",
              {
                "bg-blue-100 text-blue-700 ring-blue-300":
                  activeFilter === "All" && status === "All",
                "bg-green-100 text-green-800 ring-green-300":
                  activeFilter === "Active" && status === "Active",
                "bg-yellow-100 text-yellow-800 ring-yellow-300":
                  activeFilter === "Paused" && status === "Paused",
                "bg-gray-100 hover:bg-gray-200 text-gray-700":
                  activeFilter !== status,
              }
            )}
          >
            {status}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          reset();
          setActiveFilter("All");
        }}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-100 transition-all duration-200"
      >
        Reset
      </button>
    </div>
  );
};
