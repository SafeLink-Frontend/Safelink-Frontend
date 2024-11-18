"use client";
import { fetchMyInventory, fetchUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
    staleTime: 10 * 60 * 1000, // Cache the data for 5 minutes
    refetchOnReconnect: "always",
  });
};
