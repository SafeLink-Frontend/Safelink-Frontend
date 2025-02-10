"use client";

import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";
import { Product, UserProduct } from "@/types/product";
import { formatCurrency } from "@/util/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { MediaGallery } from "@/components/MediaGallery";
import "../app/MediaGallery.css";
import useListStore from "@/store/useListStore";

const Inventory = ({ inventory }: { inventory: UserProduct[] }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useListStore();

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div
        className="grid sm:w-full sm:space-4 xl:space-8 2xl:space-8 xxl:space-16 gap-4 sm:px-4 lg:px-8 xl:px-8 2xl:px-8  xxl:px-32
        sm:grid-cols-1 
        grid-cols-3
        xxl:grid-cols-5"
      >
        {inventory?.map((item, index) => {
          const isInCart = favorites.some((fav) => fav.id === item._id);
          return (
            <div
              key={index}
              className="relative rounded-3xl xxl:w-auto bg-[#F6F6F6]"
            >
              <MediaGallery images={item.images} videos={item.videos} />

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

              <div className="flex gap-2 p-2">
                <Link
                  href={{ pathname: `/product/${item._id}` }}
                  className="bg-[#F2BE5C] py-2 rounded-lg w-full flex justify-center text-white border-[#CAC4D0] border"
                >
                  view more
                </Link>
                <button
                  onClick={() =>
                    isInCart
                      ? removeFromFavorites(item._id)
                      : addToFavorites({
                          id: item._id,
                          title: item.title,
                          description: item.description,
                          price: item.price,
                          currency: item.currency,
                          image: item.images[0],
                          owner: {
                            id: item.owner._id,
                            phoneNumber: item.owner.phoneNumber,
                          },
                        })
                  }
                  className="bg-[#F2BE5C] py-2 px-4 rounded-lg text-white border-[#CAC4D0] border whitespace-nowrap"
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Inventory;
