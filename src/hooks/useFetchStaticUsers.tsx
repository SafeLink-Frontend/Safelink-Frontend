"use client";
import { fetchStaticUsers, fetchUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchStaticUsers = () => {
  return useQuery({
    queryKey: ["static-users"],
    queryFn: fetchStaticUsers,
    staleTime: 500 * 60 * 1000, // Cache the data for 5 minutes
    refetchOnReconnect: "always",
  });
};
