"use client";
import { fetchInventoryBySearch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchInventoryBySearch = (query: string) => {
  return useQuery({
    queryKey: ["search-inventory"],
    queryFn: () => fetchInventoryBySearch(query),
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    refetchOnReconnect: "always",
  });
};
