"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaRegUserCircle } from "react-icons/fa";
import SubscriptionCard from "@/components/SubscriptionCard";
import { getSubscriptionPlans } from "@/lib/api";
import LoadingModal from "@/components/LoadingModal";
import Loading from "@/app/loading";
import Drawer from "@/components/Drawer";
import { MdPerson } from "react-icons/md";

const page = () => {
  const router = useRouter();
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      setIsLoading(true);
      const plans = await getSubscriptionPlans(router);
      console.log({ plans });
      setIsLoading(false);
      setSubscriptionPlans(plans?.filter((item) => item.name !== "free") ?? []);
      console.log({ plans });
    };

    fetchSubscriptionPlans();
  }, [router]);

  return (
    <section className="px-5 py-10">
      <div className="flex items-center justify-between mb-2">
        <button
          className=" "
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="p-2 sm:flex hidden "
          onClick={() => {
            router.push("/profile");
          }}
        >
          <FaRegUserCircle size={24} />
        </button>
      </div>

      <div className="flex-1 text-center">
        <h1 className="font-semibold text-[#252625] text-[20px] leading-7">
          Prices
        </h1>
        <p className="text-[#252625] leading-4 text-[10px]">
          by showcasing your exclusive listings to our highly-esteemed users
        </p>
      </div>

      <div className="sm:w-full sm:flex sm:flex-col grid grid-cols-2 gap-5 max-w-[860px] mx-auto">
        {subscriptionPlans?.map((subscription, idx) => (
          <SubscriptionCard key={idx} subscription={subscription} />
        ))}
        {/* <SubscriptionCard subscriptions={SubscriptionList} /> */}
      </div>
      <LoadingModal isOpen={isLoading}>
        <Loading />
      </LoadingModal>
      {/* <div className="w-full h-32 justify-center items-center">
        <LoadingModal />
      </div> */}
    </section>
  );
};

export default page;
