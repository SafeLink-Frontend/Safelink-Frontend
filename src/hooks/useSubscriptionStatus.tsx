import { getUserSubscriptionStatus } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionStatus = () => {
  return useQuery({
    queryKey: ["subscription"], // Query key is a combination of 'subscriptionStatus' and userId
    queryFn: getUserSubscriptionStatus, // Function to fetch the subscription status
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Disable refetch when the window is focused
  });
};
