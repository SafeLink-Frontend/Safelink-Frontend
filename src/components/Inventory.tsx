"use client";

import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";
import { Product, UserProducts } from "@/types/product";
import { formatCurrency } from "@/util/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { MediaGallery } from "@/components/MediaGallery";
import "../app/MediaGallery.css";
import useListStore from "@/store/useListStore";
import useUserStore from "@/store/useUserStore";
import { formatToNaira } from "@/util/formatToNaira";
import { MdDelete } from "react-icons/md";

const Inventory = ({
  inventory,
  ownerId,
}: {
  inventory: UserProducts;
  ownerId?: string;
}) => {
  const { favorites, addToFavorites, removeFromFavorites } = useListStore();
  const { user } = useUserStore();
  // const url = `https://www.joinsafelink.com${pathname}`; //typeof window !== "undefined" && window.location.href;

  // const whatsappText = `Hi, I'm interested in these item(s) from your store:\n
  // *${'asd}*\n
  // Price: _${formatCurrency(inventory.price, inventory.currency)}_\n
  // Link: ${url}`;

  // const encodedText = encodeURIComponent(whatsappText);

  const favoritesSpecificToUser = favorites.filter(
    (item) => item.owner.id === ownerId
  );

  console.log("inventory", inventory);
  console.log("ownerId", ownerId);
  console.log("favorites", favorites);
  console.log("favoritesSpecificToUser", favoritesSpecificToUser);

  return (
    <section className="w-full h-full flex flex-col items-center pb-8 lg:pb-12 xxl:pb-16">
      <div
        className="grid 
          sm:w-full 
          gap-4 lg:gap-6 xxl:gap-8 
          sm:px-4 lg:px-8 xl:px-8 2xl:px-8 xxl:px-16 
          grid-cols-3 
          sm:grid-cols-1 
          lg:grid-cols-4 
          xxl:grid-cols-5"
      >
        {inventory?.map((item, index) => {
          const isInCart = favorites.some((fav) => fav.id === item._id);
          return (
            <div
              key={index}
              className="relative rounded-3xl xxl:w-auto bg-[#F6F6F6] flex flex-col"
            >
              <MediaGallery images={item.images} videos={item.videos} />

              <div className="p-2 lg:p-4 xxl:p-6 flex-grow">
                <p className="text-[#1C1B1F] text-[24px] lg:text-[28px] xxl:text-[32px] font-semibold mb-1 lg:mb-2 xxl:mb-3">
                  {item?.title}
                </p>
                <p className="text-[#49454F] text-[16px] lg:text-[18px] xxl:text-[20px] tracking-wide mb-2 lg:mb-3 xxl:mb-4">
                  {formatCurrency(item.price, item.currency)}
                </p>
                <small className="text-[#49454F] text-[14px] lg:text-[15px] xxl:text-[16px] leading-5 lg:leading-6 xxl:leading-7 line-clamp-5 ">
                  {item?.description}
                </small>
              </div>

              <div className="flex gap-2 lg:gap-3 xxl:gap-4 p-2 lg:p-4 xxl:p-6 mt-auto">
                <Link
                  href={{ pathname: `/product/${item._id}` }}
                  className="bg-[#F2BE5C] py-2 lg:py-3 xxl:py-4 rounded-lg w-full flex justify-center text-white border-[#CAC4D0] border text-[14px] lg:text-[16px] xxl:text-[18px]"
                >
                  view more
                </Link>
                {item.owner !== user?.id && (
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
                              id: item.owner,
                              phoneNumber: 0,
                            },
                          })
                    }
                    className={`text-white py-2 lg:py-3 xxl:py-4 px-4 lg:px-5 xxl:px-6 rounded-lg bg-black whitespace-nowrap text-[14px] lg:text-[16px] xxl:text-[18px]`}
                  >
                    {isInCart ? "Remove" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Inventory;
