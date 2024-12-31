"use client";
import { fetchMyReferral } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyReferral = () => {
  return useQuery({
    queryKey: ["my-referral"],
    queryFn: fetchMyReferral,
    staleTime: 10 * 60 * 1000, // Cache the data for 5 minutes
    retry: false,
    refetchOnWindowFocus: false,

    // refetchOnReconnect: "always",
  });
};
