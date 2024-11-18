"use client";
import Loading from "@/app/loading";
import useListStore from "@/store/useListStore";
import { Product, UserProduct } from "@/types/product";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Inventory from "./Inventory";
import PictureCategories from "./PictureCategories";

function AboutMeSection({
  user,
  inventory,
}: {
  user: User;
  inventory: UserProduct[];
}) {
  const [type, setType] = useState<"images" | "inventory">("inventory");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const categories = [
    {
      title: "Professional Pictures",
      images: user?.professionalPictures,
    },
    {
      title: "Work Pictures",
      images: user?.workPictures,
    },
    {
      title: "Leisure Pictures",
      images: user?.leisurePictures,
    },
  ];

  return (
    <>
      <div className="flex-row flex w-full justify-around my-8 border-y-4 border-[#ECEDEE]">
        <button
          className="items-center flex flex-col"
          onClick={() => setType("images")}
        >
          <div
            className={`text-[18px] sm:text-[13px] py-2 sm:text-[#696969] leading-5 font-medium text-black/[0.5]`}
          >
            This is me
          </div>
          {type === "images" && (
            <div
              className={`h-[6px] sm:h-[4px] bg-primary w-48 sm:w-28 rounded-md`}
            />
          )}
        </button>
        <button
          className="items-center flex flex-col"
          onClick={() => setType("inventory")}
        >
          <div className="text-[18px] sm:text-[13px] py-2 sm:text-[#696969] font-medium text-black/[0.5]">
            Patronize me
          </div>
          {type === "inventory" && (
            <div className="h-[6px] sm:h-[4px] sm:w-28 bg-primary w-48 rounded-md" />
          )}
        </button>
      </div>
      <div>
        {type === "images" ? (
          isCategoriesLoading ? (
            <Loading />
          ) : categories.length > 0 ? (
            <PictureCategories categories={categories} />
          ) : (
            <div>
              <p>No images found</p>
            </div>
          )
        ) : isLoading ? (
          <Loading />
        ) : inventory.length > 0 ? (
          <Inventory inventory={inventory} />
        ) : (
          <div>
            <p>No inventory found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AboutMeSection;
