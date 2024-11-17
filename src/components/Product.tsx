"use client";
import BlackOverlay from "@/components/BlackOverlay";
import NextJsLightBox from "@/components/NextJsLightBox";
import ProductImages from "@/components/ProductImages";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import ProductVideos from "@/components/ProductVideos";
import { Product } from "@/types/product";
import { fetchSingleInventory } from "@/lib/api";
import Loading from "@/app/loading";
import useListStore from "@/store/useListStore";
import Toast from "react-hot-toast";
import { RWebShare } from "react-web-share";

function Page({ inventory }: { inventory: Product }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname", pathname);
  //   const url = `${window.location.href}/product?id=${inventory._id}`;
  const url = `https://www.joinsafelink.com${pathname}`; //typeof window !== "undefined" && window.location.href;
  console.log(url);

  const [open, setOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"images" | "videos">("images");
  // const videos = [...Array(2)].map(() => ({
  //   src: "/video1.mp4",
  //   type: "video/mp4",
  // }));
  console.log("int", inventory);

  const [isLoading, setIsLoading] = useState(false);

  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();

  const isFavorite = favorites.some((item) => item.id === inventory?._id);

  const handleFavoriteToggle = () => {
    if (!inventory) return;
    if (isFavorite && inventory?._id !== null) {
      removeFromFavorites(
        typeof inventory?._id === "string" ? inventory._id : ""
      );
      Toast.error("item removed from your list");
    } else {
      // Add the item to favorites with relevant properties
      Toast.success("item added to your list");
      addToFavorites({
        id: typeof inventory?._id === "string" ? inventory._id : "",
        title: inventory.title,
        description: inventory.description,
        price: inventory.price,
        image: inventory.images[0],
      });
    }
  };

  const whatsappText = `Hi, I'm interested in these items from your store: ${url} `;

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loading />
      </div>
    );
  }

  const imageSlides = inventory?.images?.map((image: any) => ({ src: image }));
  const videoSlides = inventory?.videos?.map((video: any) => ({ src: video }));

  return (
    <div>
      :
      {mediaType === "images" ? (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={imageSlides}
          render={{ slide: NextJsLightBox }}
          plugins={[Thumbnails, Fullscreen]}
        />
      ) : (
        <Lightbox plugins={[Video]} slides={videoSlides} />
      )}
      <div className="mt-4 mx-4 text-center">
        <div className="mt-2 mx-4 sm:mx-0 sm:mb-4 flex-row sm:flex-col flex items-start">
          <button
            onClick={() => router.back()}
            className="bg-transparent flex flex-row  space-x-2"
          >
            <FaArrowLeft size={24} />
            <div>Back</div>
          </button>
          <div className="flex flex-1 flex-col w-full">
            <h2 className="font-bold sm:text-lg text-2xl text-primary">
              {inventory?.title}
            </h2>
            <p className="font-semibold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(inventory?.price ?? 0)}
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-left mt-2">{inventory?.description}</p>

        <div className="flex flex-row justify-center mt-4 space-x-2">
          <button
            onClick={() => setMediaType("images")}
            className={`py-2 px-4 rounded-sm ${mediaType === "images" ? "bg-[#0d0d0d] text-white" : "bg-[#a6a6a6] text-[#252625]"}`}
          >
            Photos
          </button>
          <button
            onClick={() => setMediaType("videos")}
            className={`py-2 px-4 rounded-sm ${mediaType === "videos" ? "bg-[#0d0d0d] text-white" : "bg-[#a6a6a6] text-[#252625]"}`}
          >
            Videos
          </button>
        </div>

        <div className="mt-4 sm:mt-2 gap-3 grid">
          {inventory?.images && inventory.videos && (
            <div className="space-y-4 flex flex-col items-center">
              {mediaType === "images" ? (
                <ProductImages images={inventory?.images} />
              ) : (
                <ProductVideos videos={inventory?.videos} />
              )}

              {mediaType === "images" && (
                <button
                  //href={"/view-media"}
                  onClick={() => setOpen(true)}
                  className="border-primary border hover:text-opacity-80 p-2 text-primary rounded-md w-[70%] sm:w-[90%]"
                >
                  View Media
                </button>
              )}

              <button
                onClick={handleFavoriteToggle}
                className="bg-primary hover:bg-opacity-80 p-2  text-white rounded-md w-[70%] sm:w-[90%]"
              >
                {isFavorite
                  ? "remove this item from your list"
                  : "Add this item to your List"}
              </button>

              <div className="bg-primary/[0.6] py-4 w-[60%] rounded-lg sm:w-[90%] space-y-4 items-start px-2 flex flex-col">
                <div className="font-semibold">Your List</div>
                <div className="flex flex-row sm:flex-col justify-between  w-full ">
                  <div className="flex items-center gap-2   ">
                    <a
                      className="bg-green-700 hover:bg-opacity-80 py-1 px-2 font-semibold sm:justify-center rounded-lg text-white flex flex-row items-center sm:space-x-2 space-x-1"
                      href={`https://wa.me/${"+234" + inventory.owner.phoneNumber}/?text=${whatsappText}`}
                      data-action="share/whatsapp/share"
                    >
                      <FaWhatsapp size={24} color="#fff" />
                      <div className="sm:text-sm">
                        Share list to seller via Whatsapp
                      </div>
                    </a>
                  </div>
                  <button className="bg-red-700 hover:bg-opacity-80 p-1 font-semibold sm:justify-center rounded-lg text-white flex flex-row items-center sm:mt-2 sm:space-x-2 space-x-1">
                    <MdDelete color="#fff" size={24} />
                    <div>Clear list</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;