"use client";
import Inventory from "@/components/Inventory";
import PictureCategories from "@/components/PictureCategories";
import ProfileHeader from "@/components/ProfileHeader";
import QA from "@/components/QA";
import {
  baseUrl,
  fetchQuestionsAnswers,
  fetchQuestionsAnswersByUserId,
  fetchUserById,
  fetchUserInventory,
} from "@/lib/api";
import useListStore from "@/store/useListStore";
import { Product } from "@/types/product";
import { formatToNaira } from "@/util/formatToNaira";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import useUserStore from "@/store/useUserStore";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LoadingModal from "@/components/LoadingModal";
import Loading from "@/app/loading";
import UserProfileHeader from "@/components/UserProfileHeader";
import router from "next/router";
import Head from "next/head";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useSearchParams();
  const id = params.get("userId");
  console.log({ id });

  const fetchUser = async () => {
    if (!id) return;

    const user = await fetchUserById(id);
    console.log("puser", user);
    if (user) setUser(user);
  };

  useEffect(() => {
    console.log({ id });
    fetchUser();
  }, [id]);

  console.log("user", user);

  const [type, setType] = useState<"images" | "inventory">("inventory");
  const router = useRouter();
  //const inventory = createObjectCopies(inventoryObject);
  const [questions, setQuestions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState<Product | any>({});
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

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

  const fetchQuestionsAndAnswerdata = async () => {
    setIsCategoriesLoading(true);
    const response = await fetchQuestionsAnswersByUserId(id ?? "");
    if (response) {
      setQuestions(response);
      setIsCategoriesLoading(false);
    }
  };

  const loadInventory = async () => {
    setIsLoading(true);
    const data = user && (await fetchUserInventory(user._id, router));
    if (data) {
      setInventory(data);
      console.log("loaded inventory", data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchQuestionsAndAnswerdata();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      loadInventory();
    }
  }, [user]);

  return (
    <div className="w-full">
      <LoadingModal isOpen={user === null}>
        {user === null && <Loading />}
      </LoadingModal>
      {user && (
        <Head>
          {/* These meta tags will update client-side */}
          <meta
            name="description"
            content={`Profile page for ${user.name || user.email}`}
          />
          <meta
            property="og:title"
            content={`${user.name || user.email} | SAFELINK Profile`}
          />
          <meta
            property="og:description"
            content={
              user.about ?? `Profile page for ${user.name || user.email}`
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

      {user && <UserProfileHeader user={user} />}
      {questions.length > 0 && <QA questions={questions} />}
      <div className="flex-row flex justify-around my-8 border-y-4 border-[#ECEDEE]">
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
              className={`h-[6px] sm:h-[4px] sm:bg-[#000000] bg-[#00000080] w-48 sm:w-28 rounded-md`}
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
            <div className="h-[6px] sm:h-[4px] sm:w-28 sm:bg-[#000000] bg-[#00000080] w-48 rounded-md" />
          )}
        </button>
      </div>
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
      {favorites.length > 0 && (
        <div className="bg-[#B28E49] rounded-md p-2 my-3">
          <p className="text-[12px] leading-4 font-semibold text-white">
            Your List
          </p>
          {favorites.map((item, index) => (
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
          <div className="flex items-center justify-between gap-1">
            <button className="text-white font-semibold text-[12px] leading-5 flex items-center gap-3 bg-[#4CAF50] p-2 rounded-md my-2 flex-1 text-nowrap">
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
