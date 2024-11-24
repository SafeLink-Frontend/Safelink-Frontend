"use client";
import {
  baseUrl,
  fetchQuestionsAnswers,
  fetchQuestionsAnswersByUserId,
  fetchUserById,
} from "@/lib/api";
import { UserProduct } from "@/types/product";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchSingleInventory = async (
  id: string | null
): Promise<UserProduct | null> => {
  const response = await axios.get(`${baseUrl}/inventory/${id}`);
  const data = response.data.data;
  return data;
};

export const useFetchInventoryById = (id: string) => {
  return useQuery({
    queryKey: ["inventory-id", id],
    queryFn: () => fetchSingleInventory(id),
    staleTime: 100 * 60 * 1000, // Cache the data for 5 minutes
    enabled: Boolean(id),
  });
};
