"use client";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import React from "react";
import { handleGoogleLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import useModalStore from "@/store/useModalStore";
import { useQueryClient } from "@tanstack/react-query";

function GoogleAuthButton({ referralCode = "" }: { referralCode?: string }) {
  const { closeLogInModal } = useModalStore();
  const router = useRouter();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const form = typeof window !== "undefined" && document.querySelector("form"); // Assuming this button is inside a form
  const formData = form && new FormData(form as HTMLFormElement); // Gather form data

  console.log("form", formData);

  return (
    <div className="w-[100%] flex justify-center">
      <GoogleLogin
        //width={"100%"}
        onSuccess={(googleResponse) =>
          handleGoogleLogin(
            router,
            googleResponse,
            setUser,
            closeLogInModal,
            queryClient,
            referralCode
          )
        }
        onError={() => {
          console.log("Google Login Failed");
          toast.error("Sign in with google failed");
        }}

        // useOneTap
      />
    </div>
  );
}

export default GoogleAuthButton;
