"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import React from "react";
import { handleGoogleLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import useModalStore from "@/store/useModalStore";

function CustomGoogleAuthButton() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const { closeLogInModal } = useModalStore();

  // Use the useGoogleLogin hook
  const login = useGoogleLogin({
    onSuccess: (googleResponse) => {
      handleGoogleLogin(
        router,
        googleResponse,
        setUser,
        closeLogInModal,
        queryClient
      );
    },
    onError: () => {
      console.log("Google Login Failed");
      toast.error("Sign in with Google failed");
    },
  });

  return (
    <div className="w-[100%] flex justify-center">
      <button
        onClick={() => login()} // Trigger login when the button is clicked
        className="border-[#F2BE5C] text-primary hover:bg-primary/15 capitalize flex items-center gap-3 leading-6 p-2 border rounded-md cursor-pointer text-nowrap"
      >
        Join Safelink
      </button>
    </div>
  );
}

export default CustomGoogleAuthButton;
