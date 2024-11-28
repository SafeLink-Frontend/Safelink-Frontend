import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query: string) => set({ query }),
    }),
    {
      name: "search-store", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useSearchStore;
