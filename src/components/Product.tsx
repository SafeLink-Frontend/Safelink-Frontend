"use client";
import NextJsLightBox from "@/components/NextJsLightBox";
import ProductImages from "@/components/ProductImages";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import ProductVideos from "@/components/ProductVideos";
import { UserProduct } from "@/types/product";
import Loading from "@/app/loading";
import useListStore from "@/store/useListStore";
import Toast from "react-hot-toast";
import { formatCurrency } from "@/util/formatCurrency";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import AlertDialogComponent from "./AlertDialogComponent";
import { deleteInventory } from "@/lib/api";

export function Product({ inventory }: { inventory: UserProduct }) {
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

  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(["profile"]);
  console.log("user", user);

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
        id: inventory?._id,
        title: inventory.title,
        description: inventory.description,
        price: inventory.price,
        currency: inventory.currency,
        image: inventory.images[0],
        owner: {
          id: inventory.owner._id,
          phoneNumber: inventory.owner.phoneNumber,
        },
      });
    }
  };

  const whatsappText = `Hi, I'm interested in these item from your store:\n
*${inventory.title}*\n
Price: _${formatCurrency(inventory.price, inventory.currency)}_\n
Link: ${url}`;

  const encodedText = encodeURIComponent(whatsappText);

  const imageSlides = inventory?.images?.map((image: any) => ({ src: image }));
  const videoSlides = inventory?.videos?.map((video: any) => ({ src: video }));

  const handleDeleteInventory = async () => {
    console.log("deleted");
    setIsLoading(true);
    await deleteInventory(inventory._id || "")
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        router.push("/profile");
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="">
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
      <div className="mt-4 mx-4 text-center sm:mt-16">
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
              {formatCurrency(inventory.price, inventory.currency)}
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

              {user?._id !== inventory.owner._id && (
                <button
                  onClick={handleFavoriteToggle}
                  className="bg-primary hover:bg-opacity-80 p-2  text-white rounded-md w-[70%] sm:w-[90%]"
                >
                  {isFavorite
                    ? "remove this item from your list"
                    : "Add this item to your List"}
                </button>
              )}

              <div className="bg-primary/[0.6] py-4 w-[70%] rounded-lg sm:w-[90%] space-y-4 items-start px-2 flex flex-col">
                {/* <div className="font-semibold">Your List</div> */}
                <div className="flex flex-row sm:flex-col sm:space-y-2 justify-between w-full ">
                  {inventory.owner._id === user?._id ? (
                    <Link
                      href={`/product/${inventory._id}/edit-product`}
                      className="border rounded-md bg-black text-white py-1 px-2"
                    >
                      Edit product
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2   ">
                      <a
                        className="bg-green-700 hover:bg-opacity-80 py-1 px-2 font-semibold sm:justify-center rounded-lg sm:w-full text-white flex flex-row items-center sm:space-x-2 space-x-1"
                        href={`https://wa.me/${"+234" + inventory.owner.phoneNumber}/?text=${encodedText}`}
                        data-action="share/whatsapp/share"
                      >
                        <FaWhatsapp size={24} color="#fff" />
                        <div className="sm:text-sm">
                          Share to seller via Whatsapp
                        </div>
                      </a>
                    </div>
                  )}
                  {inventory.owner._id === user?._id && (
                    // <button className="border rounded-md bg-red-700 text-white py-1 px-2">
                    //   Delete product
                    // </button>
                    <AlertDialogComponent
                      action={handleDeleteInventory}
                      actionButtonText="Yes, delete"
                      description="This action cannot be undone. This will permanently delete this product from your inventory"
                      title="Are you sure"
                      triggerButtonText="Delete product"
                    />
                  )}
                  {/* <button className="bg-red-700 hover:bg-opacity-80 p-1 font-semibold sm:justify-center rounded-lg text-white flex flex-row items-center sm:mt-2 sm:space-x-2 space-x-1">
                    <MdDelete color="#fff" size={24} />
                    <div>Clear list</div>
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
