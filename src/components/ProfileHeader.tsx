import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaPlus, FaRegEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import useLocalStorage from "use-local-storage";
import Link from "next/link";
import Toast, { toast } from "react-hot-toast";
import { RWebShare } from "react-web-share";
import useUserStore from "@/store/useUserStore";
import { base64ToFile } from "@/util/convertImage";
import Lightbox from "yet-another-react-lightbox";
import NextJsLightBox from "./NextJsLightBox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { SubscriptionStatus } from "@/types/SubscriptionStatus";
import { cancelSubscription, updateProfilePicture } from "@/lib/api";
import Loading from "@/app/loading";
import { useFetchShareableLink } from "@/hooks/useFetchShareableLink";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { useFetchMyProfile } from "@/hooks/useFetchMyProfile";
import AlertDialogComponent from "./AlertDialogComponent";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
//import { ShareSocial } from "react-share-social";

const ProfileHeader = () => {
  const router = useRouter();
  const { data: shareableLink, error } = useFetchShareableLink();
  console.log("shareable link", shareableLink, error);
  const { data: subscriptionStatus } = useSubscriptionStatus();
  console.log("subscription status", subscriptionStatus);
  const { data: user } = useFetchMyProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [open, setOpen] = useState(false);
  const imageSlides = [{ src: user?.profilePicture || "/pp-placeholder.png" }];

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent opening lightbox when clicking edit button
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      Toast.error("Please select an image file");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      Toast.error("Image size should be less than 5MB");
      return;
    }
    setIsUploading(true);
    await updateProfilePicture(router, file);
    setIsUploading(false);
  };

  const cancelMySubscription = useMutation({
    mutationFn: cancelSubscription,
    onError: (err: any) =>
      toast.error(err.response.message ?? "An error occured, please try again"),
    onSuccess: (response) =>
      toast.success(response.message ?? "your subscription has been cancelled"),
  });

  if (isUploading || cancelMySubscription.isPending) {
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <header className="w-full overflow-x-hidden">
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

      <div className="z-10 ">
        <Image
          width={1000}
          height={1000}
          alt="cover picture"
          src={user?.coverPicture || "/cp-placeholder.png"}
          className="w-full h-24"
        />
        {/* <button
          className="capitalize absolute top-[85px] left-[50px] sm:top-[10px] sm:left-[15px] flex z-20 items-center gap-2"
          onClick={() => router.back()}
        >
          <FaArrowLeftLong size={24} /> back
        </button> */}
      </div>
      <div className="w-full px-[20px] lg:px-[40px] xxl:px-[80px] flex items-center mt-[-40px] sm:mt-3 sm1:mt-0 z-40 justify-between sm1:px-2 ">
        <div className="flex flex-row items-center gap-2 lg:gap-4 xxl:gap-6">
          <button
            onClick={() => setOpen(true)}
            className="w-[150px] h-[150px] sm1:h-12 sm1:w-12 lg:w-[180px] lg:h-[180px] xxl:w-[220px] xxl:h-[220px] rounded-full"
          >
            <Image
              width={100}
              height={100}
              className="w-full h-full rounded-full"
              src={user?.profilePicture || "/pp-placeholder.png"}
              alt="profile"
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="mt-2 lg:mt-4 xxl:mt-6 flex flex-col justify-center ">
            <h1 className="flex items-center gap-1 lg:gap-2 xxl:gap-3 font-semibold w-auto text-[22px] sm1:text-[12px] lg:text-[28px] xxl:text-[36px] break-words">
              <span className="max-w-full overflow-hidden">
                {user?.username ?? user?.email}
              </span>
              <img
                src={"/verification.svg"}
                className="w-4 h-4 lg:w-6 lg:h-6 xxl:w-8 xxl:h-8"
                alt=""
              />
            </h1>
            <small className="text-[14px] sm1:text-[12px] lg:text-[16px] xxl:text-[18px] font-semibold leading-5 lg:leading-6 xxl:leading-7 text-[#737373]">
              Joined: {user?.createdAt && user?.createdAt.slice(0, 4)}
            </small>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4 xxl:gap-6">
          <div className="flex items-center gap-3 lg:gap-4 xxl:gap-5 justify-between sm1:hidden">
            <Link
              href="/profile/edit-profile"
              className="text-[#737373] capitalize flex items-center gap-3 leading-6 lg:leading-7 xxl:leading-8 p-2 lg:p-3 xxl:p-4 border border-[#A6A6A6] rounded cursor-pointer text-nowrap text-[14px] lg:text-[16px] xxl:text-[18px]"
            >
              <MdEdit className="w-5 h-5 lg:w-6 lg:h-6 xxl:w-7 xxl:h-7" />
              edit profile
            </Link>

            <RWebShare
              data={{
                text: "User Profile",
                url: shareableLink?.shareableLink,
                title: "share profile",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <button className="bg-[#F2BE5C] text-white capitalize flex items-center gap-3 leading-6 lg:leading-7 xxl:leading-8 p-2 lg:p-3 xxl:p-4 border border-[#F2BE5C] rounded-md cursor-pointer text-nowrap text-[14px] lg:text-[16px] xxl:text-[18px]">
                share profile
              </button>
            </RWebShare>

            <Link
              href={"/create-listing"}
              className="bg-[#252625] text-[#F2F2F2] capitalize flex items-center gap-3 leading-6 lg:leading-7 xxl:leading-8 p-2 lg:p-3 xxl:p-4 border border-[#252625] rounded cursor-pointer text-nowrap text-[14px] lg:text-[16px] xxl:text-[18px]"
            >
              <FaPlus className="w-5 h-5 lg:w-6 lg:h-6 xxl:w-7 xxl:h-7" />
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <p className="my-2 lg:my-4 xxl:my-6 px-[20px] lg:px-[40px] xxl:px-[80px]  mt-[28px] lg:mt-[40px] xxl:mt-[60px] text-[#444544] font-raleway text-[18px] lg:text-[20px] xxl:text-[24px]">
        {user?.about}
      </p>

      <div className="mb-2 mt-4 w-full justify-center hidden sm1:flex">
        <RWebShare
          data={{
            text: "",
            url: shareableLink?.shareableLink,
            title: "share profile",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button className="bg-[#F2BE5C]  w-[90%] rounded-md text-white capitalize flex items-center justify-center gap-3 leading-6 p-2 border border-[#F2BE5C] cursor-pointer text-nowrap">
            share profile
          </button>
        </RWebShare>
      </div>

      <div className="hidden sm1:flex items-center justify-between mx-[5%]">
        <>
          <button
            onClick={() => {
              router.push("/profile/edit-profile");
            }}
            className="text-[#737373] capitalize flex items-center gap-3 leading-6 p-2 border border-[#A6A6A6] rounded cursor-pointer text-nowrap"
          >
            <MdEdit size={16} />
            edit profile
          </button>
          <Link
            href={"/create-listing"}
            className="bg-[#252625] text-[#F2F2F2] capitalize flex items-center gap-3 leading-6 p-2 border border-[#252625] rounded cursor-pointer text-nowrap"
          >
            <FaPlus size={20} />
            Add Product
          </Link>
        </>
      </div>

      <div className="flex items-center mt-4 lg:mt-6 xxl:mt-8 justify-between px-[20px] lg:px-[40px] xxl:px-[80px]">
        <>
          <div className="flex space-x-2 sm1:space-x-0 items-center sm1:flex-col text-[14px] lg:text-[16px] xxl:text-[18px]">
            <div>Subscribed to:</div>
            <div className="font-semibold text-[20px] lg:text-[24px] xxl:text-[28px] text-primary">
              {subscriptionStatus?.plan?.name?.toLocaleUpperCase() ?? "FREE"}{" "}
              PLAN
            </div>
          </div>
          {subscriptionStatus?.plan?.name !== SubscriptionStatus.FREE && (
            <AlertDialogComponent
              action={() => cancelMySubscription.mutate()}
              title="Are you sure?"
              description="Your subscription will be cancelled in the next billing cycle."
              triggerButtonText="Cancel subscription"
              actionButtonText="Yes, cancel subscription"
              backgroundColor="bg-white"
              borderColor="border-red-500"
              textColor="text-red-500"
              hoverBackgroundColor="bg-red-200"
            />
          )}
        </>
      </div>
    </header>
  );
};

export default ProfileHeader;
