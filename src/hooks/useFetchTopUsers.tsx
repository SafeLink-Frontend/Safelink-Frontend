"use client";
import { fetchUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchTopUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    // refetchOnReconnect: "always",
  });
};
