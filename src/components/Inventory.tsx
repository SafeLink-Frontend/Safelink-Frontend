import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Inventory = ({ inventory }: { inventory: Product[] }) => {
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
                {item.currency} {item?.price}
              </p>
              <small className="text-[#49454F] text-[14px] leading-5 line-clamp-5 ">
                {item?.description}
              </small>
            </div>
            <button className="bg-[#F2BE5C] py-2 rounded-lg w-full text-white border-[#CAC4D0] border">
              <Link
                href={{
                  pathname: "/product",
                  //@ts-ignore
                  query: { id: item._id },
                }}
              >
                view more
              </Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Inventory;
