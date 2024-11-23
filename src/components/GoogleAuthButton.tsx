"use client";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import React from "react";
import { handleGoogleLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import useModalStore from "@/store/useModalStore";
import { useQueryClient } from "@tanstack/react-query";

function GoogleAuthButton() {
  const { closeLogInModal } = useModalStore();
  const router = useRouter();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: [
      "profile",
      "inventory",
      "my-answers",
      "shareable-link",
      "subscription",
    ],
  });

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
            queryClient
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
