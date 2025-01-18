"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const ProfilePhotos = () => {
  const router = useRouter();
  const images = [
    "/image2.jpg",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
  ];
  return (
    <div>
      <div>
        <h2 className="text-black text-[14px] leading-4 font-semibold tracking-wide">
          Description
        </h2>
        <p className="text-[10px] leading-4 text-[#444544] tracking-wider">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At tempor
          mattis turpis egestas quam cursus sit lobortis. Quam cursus bibendum
          im ut in quam et dis dui. Egestas egestas elementum proin purus.{" "}
        </p>
      </div>
      <div className="my-5 grid gap-2">
        {images.map((img, i) => (
          <Image
            width={1000}
            height={1000}
            key={i}
            className="sm:w-full h-[200px] object-cover"
            src={img}
            alt=""
          />
        ))}
      </div>
      <div className="my-3">
        <button
          onClick={() => {
            router.push("/listings/edit-listings");
          }}
          className=" bg-[#F2BE5C] w-full rounded text-white p-2"
        >
          Add this item to your List
        </button>

        <div className="bg-[#B28E49] rounded-md p-2 my-3">
          <p className="text-[12px] leading-4 font-semibold text-white">
            Your List
          </p>
          <div className="flex items-center justify-between gap-1">
            <button className="text-white font-semibold text-[12px] leading-5 flex items-center gap-3 bg-[#4CAF50] p-2 rounded-md my-2 flex-1 text-nowrap">
              <IoLogoWhatsapp size={25} />
              Share list to seller via Whatsapp
            </button>
            <button className="text-white font-semibold text-[12px] leading-5 flex items-center gap-3 bg-[#A70A0A] p-2 rounded-md my-2 text-nowrap">
              <MdDelete size={25} />
              Clear list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotos;
