"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RWebShare } from "react-web-share";
import Lightbox from "yet-another-react-lightbox";
import NextJsLightBox from "./NextJsLightBox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import useLocalStorage from "use-local-storage";
import Drawer from "./Drawer";
import useUserStore from "@/store/useUserStore";
import { useGoogleLogin } from "@react-oauth/google";
import CustomGoogleAuthButton from "./CustomGoogleAuthButon";
import { User } from "@/types/user";
import Image from "next/image";
//import { ShareSocial } from "react-share-social";

const ProfileHeader = ({ user }: { user: User }) => {
  const router = useRouter();

  // console.log("user", user);

  const [shareUrl, setShareUrl] = useState("");
  const [token] = useLocalStorage("accessToken", null);
  const isVisitor = useUserStore().user === null;

  useEffect(() => {
    setShareUrl(`${window.location.origin}/${user?.shareableLink}`);
  }, [user?._id]);

  const [open, setOpen] = useState(false);
  const imageSlides = [{ src: user?.profilePicture ?? "/pp-placeholder.png" }];

  const handleBackNavigation = () => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push("/"); // Fallback to the homepage or another desired path
    }
  };

  return (
    <header className="w-full ">
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={imageSlides}
        render={{
          slide: NextJsLightBox,
          buttonPrev: imageSlides.length <= 1 ? () => null : undefined,
          buttonNext: imageSlides.length <= 1 ? () => null : undefined,
        }}
        carousel={{ finite: imageSlides.length <= 1 }}
        plugins={[Fullscreen]}
      />
      <div className="relative ">
        <Image
          width={1000}
          height={1000}
          src={user?.coverPicture ?? "/cp-placeholder.png"}
          alt=""
          className="h-[150px] md:h-[200px] w-full object-cover"
        />
        {/* <button
          className="capitalize absolute top-2 left-2 flex items-center gap-2"
          onClick={handleBackNavigation}
        >
          <FaArrowLeftLong size={24} /> back
        </button> */}
        {/* <div className="absolute top-2 right-2 z-50 bg-red-500">
          <Drawer />
        </div> */}
      </div>
      <div className=" flex px-[20px] lg:px-[40px] items-center mt-3 justify-between max-w-[1440px] mx-auto">
        <div className="flex flex-row w-full items-center gap-2 ">
          <button
            onClick={() => setOpen(true)}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full flex justify-center items-center overflow-hidden"
          >
            <Image
              width={300}
              height={300}
              className="w-full h-full rounded-full object-cover"
              src={user?.profilePicture || "/pp-placeholder.png"}
              alt="profile"
            />
          </button>
          <div className="">
            <h1 className="flex items-center gap-1 font-semibold md:w-[40vw] text-[22px] break-words">
              <span className="max-w-full overflow-hidden">
                {user.username ?? user?.email}
              </span>
              <img src={"/verification.svg"} alt="" />
            </h1>
            <small className="text-[14px] font-semibold leading-5 text-[#737373]">
              Joined: {user?.createdAt && user?.createdAt.slice(0, 4)}
            </small>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="md:flex items-center gap-3 justify-between hidden">
            <RWebShare
              data={{
                text: "User Profile",
                url: user.shareableLink,
                title: "share profile",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <button className="bg-[#F2BE5C] text-white capitalize flex items-center gap-3 leading-6 p-2 border border-[#F2BE5C] rounded-md cursor-pointer text-nowrap">
                share profile
              </button>
            </RWebShare>
            {isVisitor && <CustomGoogleAuthButton />}
          </div>
        </div>
      </div>

      <p className="my-2 max-w-[1440px] mx-auto px-[20px] lg:px-[40px]  text-[#444544]  font-raleway text-[18px] ">
        {user?.about}
      </p>

      <div className="mb-2 mt-4 max-w-[1440px] mx-auto justify-center flex md:hidden">
        <RWebShare
          data={{
            text: "",
            url: user.shareableLink,
            title: "share profile",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button className="bg-[#F2BE5C]  w-[90%] rounded-md text-white capitalize flex items-center justify-center gap-3 leading-6 p-2 border border-[#F2BE5C] cursor-pointer text-nowrap">
            share profile
          </button>
        </RWebShare>
      </div>
    </header>
  );
};

export default ProfileHeader;
