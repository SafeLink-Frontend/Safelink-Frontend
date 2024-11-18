"use client";
import { fetchMyInventory } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyInventory = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: fetchMyInventory,
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    refetchOnReconnect: "always",
  });
};
