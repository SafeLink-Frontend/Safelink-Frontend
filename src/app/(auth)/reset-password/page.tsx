"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { handleResetPassword } from "@/lib/api";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleResetPassword(
      router,
      password,
      confirmPassword,
      token as string
    );
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center sm:px-[5%] max-w-[500px] mx-auto">
      <div className="w-full text-center mt-4 text-[24px] font-[500]">
        Reset Password
      </div>
      <div className="text-center mt-2 text-gray-600">
        Enter your new password to reset your account.
      </div>
      <div className="flex flex-col w-full mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="block mb-2">
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your new password"
            className="border border-gray-300 p-3 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            className="border border-gray-300 p-3 w-full rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-primary text-white py-2 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default Page;
