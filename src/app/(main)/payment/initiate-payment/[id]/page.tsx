"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import PaymentTransfer from "@/components/PaymentTransfer";
import PaymentCard from "@/components/PaymentCard";
import { initiateSubcription } from "@/lib/api";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

const page = () => {
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split("/").pop() || ""; //params.get("id") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"card" | "transfer">("card");

  console.log("id", id);
  const initiateTransaction = async () => {
    setIsLoading(true);
    const response = await initiateSubcription(router, id);
    if (!response) {
      // toast.error("Error initiating payment, please try again later");
      setIsLoading(false);
      return;
    }
    const redirectUrl = response?.auth_url;
    setIsLoading(true);
    router.replace(redirectUrl);
  };

  useEffect(() => {
    if (id) {
      initiateTransaction();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loading />
        <div>
          You're about to be redirected to a secure payment gateway provided by
          Paystack. This ensures that your payment information is protected by
          industry-standard security measures 🔒. Please proceed with confidence
        </div>
      </div>
    );
  }

  return (
    <section className="px-5 py-10 ">
      {/* <div className="flex items-start justify-between mb-5">
        <button
          className="p-2 -mt-5"
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft size={20} />
        </button>
        <div className="flex-1 text-center">
          <h1 className="font-semibold text-[#252625] text-[20px] leading-7">
            Payment
          </h1>
          <p className="text-[#252625] leading-4 text-[10px]">
            Select a payment method for your transaction
          </p>
        </div>
      </div>

      <div className="flex-row flex justify-around my-8">
        <button
          className="items-center flex flex-col focus:outline-none"
          onClick={() => setType("card")}
        >
          <div
            className={`text-[18px] sm:text-[13px] p-2 transition-colors duration-300 ${type === "card" ? "text-[#F2BE5C]" : "text-black"}  leading-5 font-medium`}
          >
            Pay with your card
          </div>
          {type === "card" && (
            <div
              className={`h-[6px] sm:h-[4px]  bg-[#F2BE5C] w-48 sm:w-28 rounded-md`}
            />
          )}
        </button>
        <button
          className="items-center flex flex-col focus:outline-none"
          onClick={() => setType("transfer")}
        >
          <div
            className={`text-[18px] sm:text-[13px] p-2 font-medium leading-5 transition-colors duration-300 ${type === "transfer" ? "text-[#F2BE5C]" : "text-black"}`}
          >
            Pay with bank transfer
          </div>
          {type === "transfer" && (
            <div className="h-[6px] sm:h-[4px] sm:w-28 bg-[#F2BE5C] w-48 rounded-md" />
          )}
        </button>
      </div>

      <div>{type === "card" ? <PaymentCard /> : <PaymentTransfer />}</div> */}
    </section>
  );
};

export default page;
