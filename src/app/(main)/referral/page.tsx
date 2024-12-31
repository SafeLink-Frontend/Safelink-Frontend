// page.tsx
import ReferralForm from "@/components/ReferralForm";
import { useFetchMyReferral } from "@/hooks/useFetchMyReferral";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col items-center sm:px-[5%] sm:mt-12 max-w-[500px] mx-auto">
      <div className="flex-row w-full flex items-center">
        <div className="w-full flex justify-center mt-4 text-[24px] font-[500]">
          SAFELINK
        </div>
      </div>
      <div>Refer and Earn</div>

      <ReferralForm />
    </div>
  );
}
