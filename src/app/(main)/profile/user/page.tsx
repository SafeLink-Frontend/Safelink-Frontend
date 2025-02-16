"use client";
import Inventory from "@/components/Inventory";
import PictureCategories from "@/components/PictureCategories";
import QA from "@/components/QA";
import {
  fetchQuestionsAnswersByUserId,
  fetchUserById,
  fetchUserInventory,
} from "@/lib/api";
import useListStore from "@/store/useListStore";
import { Product } from "@/types/product";
import { formatToNaira } from "@/util/formatToNaira";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LoadingModal from "@/components/LoadingModal";
import Loading from "@/app/loading";
import UserProfileHeader from "@/components/UserProfileHeader";
import Head from "next/head";
import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { useFetchUserQuestionsAnsAnswers } from "@/hooks/useFetchUserQuestionsAndAnswers";
import { useFetchUserInventory } from "@/hooks/useFetchUserInventory";
import { formatCurrency } from "@/util/formatCurrency";

const Page = () => {
  const params = useSearchParams();
  const id = params.get("userId");
  console.log({ id });
  const { data: user, isFetching: isUserFetching } = useFetchUserProfile(
    id || ""
  );
  const { data: questions, isFetching: isQuestionsFetching } =
    useFetchUserQuestionsAnsAnswers(id || "");
  const { data: inventory, isFetching: isInventoryFetching } =
    useFetchUserInventory(id || "");

  const [type, setType] = useState<"images" | "inventory">("inventory");
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();
  const favoritesSpecificToUser = favorites.filter(
    (item) => item.owner.id === user?._id
  );
  // console.log({ favorites });

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
    <div className="w-full  flex-1">
      <LoadingModal isOpen={isUserFetching}>
        {isUserFetching && <Loading />}
      </LoadingModal>
      {user && (
        <Head>
          {/* These meta tags will update client-side */}
          <meta
            name="description"
            content={`Profile page for ${user.username || user.email}`}
          />
          <meta
            property="og:title"
            content={`${user.username || user.email} | SAFELINK Profile`}
          />
          <meta
            property="og:description"
            content={
              user.about ?? `Profile page for ${user.username || user.email}`
            }
          />
          {user?.profilePicture && (
            <meta property="og:image" content={user?.profilePicture} />
          )}
        </Head>
      )}

      {/* <Head>
        <title>{user?.email}</title>
        <link rel="icon" href="@/favicon.ico" />
      </Head> */}

      <div className="w-full">
        {user && <UserProfileHeader user={user} />}
        {questions && questions.length > 0 && <QA questions={questions} />}
      </div>

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
      {type === "images" ? (
        isUserFetching ? (
          <Loading />
        ) : categories.length > 0 ? (
          <PictureCategories categories={categories} />
        ) : (
          <div>
            <p>No images found</p>
          </div>
        )
      ) : isInventoryFetching ? (
        <Loading />
      ) : inventory && inventory.length > 0 ? (
        <Inventory inventory={inventory} ownerId={user?._id} />
      ) : (
        <div>
          <p>No inventory found</p>
        </div>
      )}
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
    </div>
  );
};

export default Page;
