import { Product, UserProduct } from "@/types/product";
import { formatCurrency } from "@/util/formatCurrency";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Inventory = ({ inventory }: { inventory: UserProduct[] }) => {
  return (
    <section className="w-full h-full p-6">
      <div className="flex justify-start items-start gap-4 w-full flex-wrap">
        {inventory?.map((item, index) => (
          <div
            key={index}
            className="relative rounded-3xl w-[400px]  bg-[#F6F6F6]"
          >
            <img
              className="rounded-t-3xl w-full h-[287px] object-cover"
              src={item?.images[0]}
              alt=""
            />
            <div className="p-2">
              <p className="text-[#1C1B1F] text-[24px] font-semibold mb-1">
                {item?.title}
              </p>
              <p className="text-[#49454F] text-[16px] tracking-wide mb-2">
                {formatCurrency(item.price, item.currency)}
              </p>
              <small className="text-[#49454F] text-[14px] leading-5 line-clamp-5 ">
                {item?.description}
              </small>
            </div>

            <Link
              href={{
                pathname: `/product/${item._id}`,
              }}
              className="bg-[#F2BE5C] py-2 rounded-lg w-full flex justify-center text-white border-[#CAC4D0] border"
            >
              view more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Inventory;
