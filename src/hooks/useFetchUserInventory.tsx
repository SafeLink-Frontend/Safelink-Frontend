"use client";
import { fetchUserById, fetchUserInventory } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserInventory = (id: string) => {
  return useQuery({
    queryKey: ["user-inventory", id],
    queryFn: () => fetchUserInventory(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Cache the data for 5 minutes
  });
};
