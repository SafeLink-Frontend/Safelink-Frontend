"use client";
import { fetchQuestionsAnswersByUserId, fetchUserById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserQuestionsAnsAnswers = (id: string) => {
  return useQuery({
    queryKey: ["user-answers", id],
    queryFn: () => fetchQuestionsAnswersByUserId(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Cache the data for 5 minutes
  });
};
