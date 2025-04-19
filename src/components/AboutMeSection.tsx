"use client";
import Loading from "@/app/loading";
import useListStore from "@/store/useListStore";
import { Product, UserProduct, UserProducts } from "@/types/product";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Inventory from "./Inventory";
import PictureCategories from "./PictureCategories";
import { MdDelete } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { formatToNaira } from "@/util/formatToNaira";
import { FaArrowUp, FaListAlt } from "react-icons/fa";

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

  // Refs for scrolling and visibility detection
  const favoritesRef = useRef<HTMLDivElement>(null);
  const contentTopRef = useRef<HTMLDivElement>(null);

  // State for FAB behavior
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [showFab, setShowFab] = useState(false);

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

  const hasFavorites = favoritesSpecificToUser.length > 0;

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

  // Effect for Intersection Observer and Scroll Listener
  useEffect(() => {
    const favRefCurrent = favoritesRef.current; // Capture current ref value

    if (!hasFavorites || !favRefCurrent) {
      setShowFab(false); // Ensure FAB is hidden if no favorites or ref not ready
      return;
    }

    // Observer for favorites section visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFavoritesVisible(entry.isIntersecting);
      },
      {
        root: null, // observing intersections relative to the viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the target is visible
      }
    );

    observer.observe(favRefCurrent);

    // Listener to show/hide FAB based on scroll position
    const handleScroll = () => {
      // Show FAB only if scrolled down a bit (e.g., > 200px) and favorites exist
      setShowFab(window.scrollY > 200 && hasFavorites);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    // Cleanup function
    return () => {
      if (favRefCurrent) {
        observer.unobserve(favRefCurrent); // Use captured value
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasFavorites]); // Dependency array ensures effect runs when hasFavorites changes

  // FAB click handler
  const handleFabClick = () => {
    if (isFavoritesVisible) {
      // Scroll Up to the content area top
      contentTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Scroll Down to the favorites list
      favoritesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
      <div ref={contentTopRef}>
        {type === "images" ? (
          isCategoriesLoading ? (
            <Loading />
          ) : categories.length > 0 ? (
            <PictureCategories categories={categories} />
          ) : (
            <div className="text-center px-[20px] lg:px-[40px] xxl:px-[80px]">
              <p>No images found</p>
            </div>
          )
        ) : isLoading ? (
          <Loading />
        ) : inventory.length > 0 ? (
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
          className="bg-[#B28E49] rounded-md p-2 my-3 lg:p-4 xxl:p-6 lg:my-5 xxl:my-8 mx-[5%] lg:mx-[8%] xxl:mx-[10%]"
        >
          <p className="text-[12px] lg:text-[15px] xxl:text-[18px] leading-4 lg:leading-5 xxl:leading-6 font-semibold text-white mb-2 lg:mb-3 xxl:mb-4">
            Your List for {user?.username || "this seller"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-2 lg:gap-3 xxl:gap-4">
            {favoritesSpecificToUser.map((item, index) => (
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
              onClick={shareToWhatsApp}
              className="text-white w-full sm:w-auto font-semibold text-[12px] lg:text-[14px] leading-5 flex items-center justify-center gap-2 lg:gap-3 bg-[#4CAF50] p-2 lg:p-3 rounded-md flex-1 text-nowrap"
            >
              <IoLogoWhatsapp className="w-5 h-5 lg:w-6 lg:h-6" />
              Share list via Whatsapp
            </button>
            <button
              onClick={clearFavorites}
              className="text-white w-full sm:w-auto font-semibold text-[12px] lg:text-[14px] leading-5 flex items-center justify-center gap-2 lg:gap-3 bg-[#A70A0A] p-2 lg:p-3 rounded-md text-nowrap"
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
              : `Scroll to favorites list (${favoritesSpecificToUser.length} items)`
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
                {favoritesSpecificToUser.length}
              </span>
            )}
          </div>
        </button>
      )}
    </>
  );
}

export default AboutMeSection;
