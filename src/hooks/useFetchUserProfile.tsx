"use client";
import { fetchUserById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Cache the data for 5 minutes
  });
};
