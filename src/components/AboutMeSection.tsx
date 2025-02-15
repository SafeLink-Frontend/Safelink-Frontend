"use client";
import Loading from "@/app/loading";
import useListStore from "@/store/useListStore";
import { Product, UserProduct, UserProducts } from "@/types/product";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Inventory from "./Inventory";
import PictureCategories from "./PictureCategories";
import { MdDelete } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { formatToNaira } from "@/util/formatToNaira";

function AboutMeSection({
  user,
  inventory,
}: {
  user: User;
  inventory: UserProducts;
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

  const favoritesSpecificToUser = favorites.filter(
    (item) => item.owner.id === user?._id
  );

  const pathName = usePathname();
  const url = `https://www.joinsafelink.com/`;

  const shareToWhatsApp = () => {
    if (favoritesSpecificToUser.length === 0) return;

    // Format each item in the list
    const itemsText = favoritesSpecificToUser
      .map(
        (item, index) => `${index + 1}. *${item.title}* 
        Price: _${formatToNaira(item.price)}_
        Link: ${url + "product/" + item.id}`
      )
      .join("\n\n");

    // Complete WhatsApp message
    const whatsappText = `Hi, I'm interested in these items from your store:\n\n${itemsText}\n\n`;

    // Encode for WhatsApp URL
    const encodedText = encodeURIComponent(whatsappText);

    // Redirect to WhatsApp with pre-filled text
    window.open(
      `https://wa.me/${234 + user?.phoneNumber!}?text=${encodedText}`,
      "_blank"
    );
  };

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
          <Inventory inventory={inventory} ownerId={user?._id} />
        ) : (
          <div>
            <p>No inventory found</p>
          </div>
        )}
      </div>
      {favoritesSpecificToUser.length > 0 && (
        <div className="bg-[#B28E49] rounded-md p-2 my-3">
          <p className="text-[12px] leading-4 font-semibold text-white">
            Your List
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-2 gap-2">
            {favoritesSpecificToUser.map((item, index) => (
              <div className="bg-white p-1 flex items-center justify-between gap-3 my-2 rounded-md">
                <img className="w-10 h-10" src={item.image} alt="" />
                <div className="flex-1">
                  <h3 className="text-[#F2BE5C] font-semibold text-[12px] leading-5">
                    {item?.title}
                  </h3>
                  <small className="font-medium text-[12px] leading-5">
                    {formatToNaira(item?.price)}
                  </small>
                </div>
                <div className="flex items-center gap-2">
                  {/* <img src={"/remove.svg"} alt="" />
              <small>1</small>
              <img src={"/add.svg"} alt="" /> */}
                  <button onClick={() => removeFromFavorites(item.id)}>
                    <MdDelete className="text-[#DC1F1F]" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-1">
            <button
              onClick={shareToWhatsApp}
              // href={`https://wa.me/${"+234" + user?.phoneNumber}/?text=${encodedText}`}
              // data-action="share/whatsapp/share"
              className="text-white font-semibold text-[12px] leading-5 flex items-center gap-3 bg-[#4CAF50] p-2 rounded-md my-2 flex-1 text-nowrap"
            >
              <IoLogoWhatsapp size={25} />
              Share list to seller via Whatsapp
            </button>
            <button
              onClick={clearFavorites}
              className="text-white font-semibold text-[12px] leading-5 flex items-center gap-3 bg-[#A70A0A] p-2 rounded-md my-2 text-nowrap"
            >
              <MdDelete size={25} />
              Clear list
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutMeSection;
