"use client";
import Inventory from "@/components/Inventory";
import PictureCategories from "@/components/PictureCategories";
import ProfileHeader from "@/components/ProfileHeader";
import QA from "@/components/QA";
import { baseUrl, fetchQuestionsAnswers, fetchUserInventory } from "@/lib/api";
import useListStore from "@/store/useListStore";
import { Product } from "@/types/product";
import { formatToNaira } from "@/util/formatToNaira";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import useUserStore from "@/store/useUserStore";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Metadata } from "next";
import Head from "next/head";
import { useFetchTopUsers } from "@/hooks/useFetchTopUsers";
import { useFetchMyInventory } from "@/hooks/useFetchMyInventory";
import { useFetchShareableLink } from "@/hooks/useFetchShareableLink";
import { useFetchMyProfile } from "@/hooks/useFetchMyProfile";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { useFetchMyQuestionsAnsAnswers } from "@/hooks/useFetchMyQuestionsAndAnswer";
import { FaArrowUp, FaListAlt } from "react-icons/fa";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "My Profile | SAFELINK",
//     description:
//       "View and manage your SAFELINK profile, inventory, and pictures",
//     openGraph: {
//       title: "My Profile | SAFELINK",
//       description:
//         "View and manage your SAFELINK profile, inventory, and pictures",
//       type: "profile",
//       images: [
//         {
//           url: "/default-profile.jpg", // Default fallback image
//           width: 1200,
//           height: 630,
//           alt: "Profile Page",
//         },
//       ],
//     },
//     robots: {
//       index: false, // Typically you don't want to index personal profile management pages
//       follow: false,
//     },
//   };
// }

const Page = () => {
  // const { user } = useUserStore();
  const { data: user, isPending: isUserPending } = useFetchMyProfile();
  console.log("user", user);

  const [type, setType] = useState<"images" | "inventory">("inventory");
  const router = useRouter();
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();

  const {
    data: subscriptionStatus,
    isPending: isUserSunscriptionStatudPending,
  } = useSubscriptionStatus();

  console.log("sub status", subscriptionStatus?.plan?.name);

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

  const {
    data: inventory,
    isPending: isInventoryPending,
    isError,
  } = useFetchMyInventory();
  const { data: questions, isPending: isQuestionsPending } =
    useFetchMyQuestionsAnsAnswers();

  const favoritesRef = useRef<HTMLDivElement>(null);
  const contentTopRef = useRef<HTMLDivElement>(null);

  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const hasFavorites = favorites.length > 0;

  useEffect(() => {
    const favRefCurrent = favoritesRef.current;

    if (!hasFavorites || !favRefCurrent) {
      setShowFab(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFavoritesVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(favRefCurrent);

    const handleScroll = () => {
      setShowFab(window.scrollY > 200 && hasFavorites);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (favRefCurrent) {
        observer.unobserve(favRefCurrent);
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasFavorites]);

  const handleFabClick = () => {
    const targetRef = isFavoritesVisible ? contentTopRef : favoritesRef;
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const LoadingSpinner = () => (
    <div className="flex flex-1 min-h-screen justify-center items-center">
      <div className="my-4 border-t-2 border-b-2 border-primary rounded-full  animate-spin w-8 h-8 sm:w-6 sm:h-6"></div>
    </div>
  );

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      {user && (
        <Head>
          {/* These meta tags will update client-side */}
          <meta
            name="description"
            content={`Profile page for ${user?.username || user?.email}`}
          />
          <meta
            property="og:title"
            content={`${user?.username || user?.email} | SAFELINK Profile`}
          />
          <meta
            property="og:description"
            content={
              user?.about ?? `Profile page for ${user?.username || user?.email}`
            }
          />
          {user?.profilePicture && (
            <meta property="og:image" content={user?.profilePicture} />
          )}
        </Head>
      )}

      <ProfileHeader />
      {questions && questions?.length > 0 && <QA questions={questions} />}
      <div className="flex-row flex justify-around my-8 border-y-4 border-[#ECEDEE] lg:my-12 xxl:my-16">
        <button
          className="items-center flex flex-col"
          onClick={() => setType("images")}
        >
          <div
            className={`text-[18px] sm:text-[13px] lg:text-[22px] xxl:text-[28px] py-2 sm:text-[#696969] leading-5 font-medium text-black/[0.5]`}
          >
            This is me
          </div>
          {type === "images" && (
            <div
              className={`h-[6px] sm:h-[4px] bg-primary w-48 sm:w-28 lg:w-64 xxl:w-80 rounded-md`}
            />
          )}
        </button>
        <button
          className="items-center flex flex-col"
          onClick={() => setType("inventory")}
        >
          <div className="text-[18px] sm:text-[13px] lg:text-[22px] xxl:text-[28px] py-2 sm:text-[#696969] font-medium text-black/[0.5]">
            Patronize me
          </div>
          {type === "inventory" && (
            <div className="h-[6px] sm:h-[4px] sm:w-28 bg-primary w-48 lg:w-64 xxl:w-80 rounded-md" />
          )}
        </button>
      </div>
      <div ref={contentTopRef}>
        {type === "images" ? (
          isUserPending ? (
            <LoadingSpinner />
          ) : categories.length > 0 ? (
            <PictureCategories categories={categories} />
          ) : (
            <div className="text-center px-[20px] lg:px-[40px] xxl:px-[80px]">
              <p>No images found</p>
            </div>
          )
        ) : isInventoryPending ? (
          <LoadingSpinner />
        ) : inventory && inventory?.length > 0 ? (
          <Inventory inventory={inventory} ownerId={user?._id} />
        ) : (
          <div className="text-center px-[20px] lg:px-[40px] xxl:px-[80px]">
            <p>No inventory found</p>
          </div>
        )}
      </div>
      {hasFavorites && (
        <div
          ref={favoritesRef}
          className="bg-[#B28E49] rounded-md py-2 lg:py-4 xxl:py-6 px-[20px] lg:px-[40px] xxl:px-[80px] my-3 lg:my-5 xxl:my-8"
        >
          <p className="text-[12px] lg:text-[15px] xxl:text-[18px] leading-4 lg:leading-5 xxl:leading-6 font-semibold text-white mb-2 lg:mb-3 xxl:mb-4">
            Your List
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-2 lg:gap-3 xxl:gap-4">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="bg-white p-1 lg:p-2 flex items-center justify-between gap-2 my-1 rounded-md"
              >
                <img
                  className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded"
                  src={item.image}
                  alt=""
                />
                <div className="flex-1 overflow-hidden mr-1">
                  <h3 className="text-[#F2BE5C] font-semibold text-[12px] lg:text-[13px] leading-5 truncate">
                    {item?.title}
                  </h3>
                  <small className="font-medium text-[12px] lg:text-[13px] leading-5 block">
                    {formatToNaira(item?.price)}
                  </small>
                </div>
                <div className="flex items-center">
                  <button onClick={() => removeFromFavorites(item.id)}>
                    <MdDelete className="text-[#DC1F1F] w-5 h-5 lg:w-6 lg:h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 lg:gap-3 mt-3 lg:mt-4">
            <button
              onClick={clearFavorites}
              className="text-white w-full font-semibold text-[12px] lg:text-[14px] leading-5 flex items-center justify-center gap-2 lg:gap-3 bg-[#A70A0A] p-2 lg:p-3 rounded-md text-nowrap"
            >
              <MdDelete className="w-5 h-5 lg:w-6 lg:h-6" />
              Clear list
            </button>
          </div>
        </div>
      )}
      {showFab && (
        <button
          onClick={handleFabClick}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 xxl:bottom-10 xxl:right-10 z-50 bg-primary text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 ease-in-out"
          aria-label={
            isFavoritesVisible
              ? "Scroll to top of content"
              : `Scroll to favorites list (${favorites.length} items)`
          }
        >
          <div className="relative">
            {isFavoritesVisible ? (
              <FaArrowUp className="w-5 h-5 lg:w-6 lg:h-6" />
            ) : (
              <FaListAlt className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
            {hasFavorites && !isFavoritesVisible && (
              <span className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {favorites.length}
              </span>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default Page;
