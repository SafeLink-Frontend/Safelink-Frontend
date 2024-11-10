import { PaymentPlan } from "@/types/PaymentPlan";
import Link from "next/link";
import React from "react";

interface Subscription {
  _id: string;
  name: string;
  price: string;
  duration: string;
  planCode: string;
  benefits: string[];
}

interface SubscriptionCardProps {
  subscription: PaymentPlan;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
}) => {
  return (
    <div>
      <div
        className="bg-white  drop-shadow-[#000026] rounded-xl p-5 shadow-lg shadow-[#00000026] mb-5 h-fit"
        key={subscription._id}
      >
        <div className="flex items-center gap-3">
          <img src={"/ellipse.svg"} alt="" />
          <h2 className="text-[#170F49] leading-[35px] font-bold capitalize">
            {subscription.name}
          </h2>
        </div>
        <div>
          <p className="py-2 mt-2">
            <span className="text-[#170F49] font-bold leading-[30px] text-[32px]">
              {"₦"}
              {subscription.price}
            </span>{" "}
            <span className="text-md text-gray-500 line-through">
              ₦{subscription.slashedPrice}
            </span>
            /{subscription.duration}
            {" month(s)"}
          </p>

          <small className="text-[#170F49] font-bold leading-[20px] my-3 pb-3">
            What's included
          </small>
        </div>
        <div className="flex flex-col gap-3">
          {subscription.benefits.map((offer, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <img src={"check.svg"} alt="" />
              <small className="text-[#170F49] text-[11px]">{offer}</small>
            </div>
          ))}
        </div>
        <div className="flex">
          <Link
            className="bg-[#F2BE5C] w-full py-2 px-5 rounded-full my-3 text-white capitalize text-[12px] leading-5 text-center font-bold cursor-pointer"
            href={{
              pathname: "/payment",
              query: {
                id: subscription._id,
              },
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
