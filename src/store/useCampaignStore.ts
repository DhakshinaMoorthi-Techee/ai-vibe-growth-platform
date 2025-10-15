import { create } from "zustand";
import { data } from "../data/campaigns";

export type Campaign = {
  id: number;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  status: "Active" | "Paused";
};

interface CampaignStore {
  campaigns: Campaign[];
  filtered: Campaign[];
  setFilter: (status: string) => void;
  reset: () => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: data,
  filtered: data,
  setFilter: (status) =>
    set((state) => ({
      filtered:
        status === "All"
          ? state.campaigns
          : state.campaigns.filter((c) => c.status === status),
    })),
  reset: () => set({ filtered: data }),
}));
