"use client";
import { fetchMyInventory, generateShareableLink } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchShareableLink = () => {
  return useQuery({
    queryKey: ["shareable-link"],
    queryFn: generateShareableLink,
    staleTime: 20 * 60 * 1000, // Cache the data for 5 minutes
    refetchOnReconnect: "always",
  });
};
