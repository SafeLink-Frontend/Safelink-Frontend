"use client";
import {
  fetchQuestionsAnswers,
  fetchQuestionsAnswersByUserId,
  fetchUserById,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyQuestionsAnsAnswers = () => {
  return useQuery({
    queryKey: ["my-answers"],
    queryFn: fetchQuestionsAnswers,
    staleTime: 30 * 60 * 1000, // Cache the data for 5 minutes
  });
};
