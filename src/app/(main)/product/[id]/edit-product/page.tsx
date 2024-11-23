"use client";
import Loading from "@/app/loading";
import Inventory from "@/components/Inventory";
import { useFetchInventoryById } from "@/hooks/useFetchInventoryById";
import { useFetchMyProfile } from "@/hooks/useFetchMyProfile";
import { addInventory, updateInventory } from "@/lib/api";
import { User } from "@/types/user";
import { convertFilesToBase64 } from "@/util/convertImage";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { number } from "yup";

//import axios from 'axios';

export default function EditListing() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const id = pathname.split("/")[2];
  const { data: inventory, isLoading: isInventoryLoading } =
    useFetchInventoryById(id);
  const user: User | undefined = queryClient.getQueryData(["profile"]);
  console.log("user", user);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(inventory?.title);
  const [description, setDescription] = useState(inventory?.description);
  const [price, setPrice] = useState<any>(inventory?.price);
  const [currency, setCurrency] = useState(inventory?.currency);
  const [images, setImages] = useState<any>(inventory?.images);
  const [videos, setVideos] = useState<any>(inventory?.videos);
  const [cover, setCover] = useState(null);

  const handleImageChange = (e: any) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages: string[]) => [...prevImages, ...newFiles]);
  };

  const handleVideoChange = (e: any) => {
    const newFiles = Array.from(e.target.files);
    setVideos((prevVideos: string[]) => [...prevVideos, ...newFiles]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages: string[]) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleDeleteVideo = (index: number) => {
    setVideos((prevVideos: string[]) =>
      prevVideos.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(true);
      const data = {
        title,
        currency,
        price,
        description,
        // cover: cover ? await convertFileToBase64(cover) : cover,
        _id: inventory?._id,
        images: images.length > 0 ? await convertFilesToBase64(images) : images,
        videos,
      };
      console.log({ data });
      const response = await updateInventory(data, inventory?._id || "");
      console.log("rt", response);

      queryClient.invalidateQueries({ queryKey: ["profile", "inventory"] });
      router.back();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  //convertFilesToBase64([cover]).then((item) => console.log("xn", item[0]));

  useEffect(() => {
    if (inventory) {
      setTitle(inventory.title);
      setDescription(inventory.description);
      setPrice(inventory.price);
      setCurrency(inventory.currency);
      setImages(inventory.images || []);
      setVideos(inventory.videos || []);
    }
  }, [inventory]);

  if (isInventoryLoading || isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:mt-12">
      {isLoading && <Loading />}
      <h1 className="text-3xl font-bold mb-4">Edit Your Listing</h1>
      {/* <p className="text-gray-500 mb-6">
        by showcasing your exclusive listings to our highly-esteemed users
      </p> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title/Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Very Short headline for your listing"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={250}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Cover</label>
          <input
            type="file"
            //multiple
            onChange={handleCoverChange}
            accept="image/png, image/jpeg, image/gif"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/gif"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {images?.map((file: any, index: string) => (
              <div key={index} className="relative">
                <img
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt={`Uploaded ${index + 1}`}
                  className="w-32 h-32 object-cover border rounded"
                />
                <button
                  onClick={() => handleDeleteImage(Number(index))}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Video</label>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/mp4"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {videos?.map((file: any | string, index: string) => (
              <div key={index} className="relative">
                <video
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  controls
                  className="w-32 h-32 object-cover border rounded"
                />
                <button
                  onClick={() => handleDeleteVideo(Number(index))}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <div className="flex">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border border-gray-300 rounded ml-2"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NGN">NGN</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white w-36 p-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
