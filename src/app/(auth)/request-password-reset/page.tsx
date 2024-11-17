"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { handleRequestResetLink } from "@/lib/api";

const Page = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleRequestResetLink(email);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center sm:px-[5%] max-w-[500px] mx-auto">
      <div className="w-full text-center mt-4 text-[24px] font-[500]">
        Forgot Password
      </div>
      <div className="text-center mt-2 text-gray-600">
        Enter your email address to receive a password reset link.
      </div>
      <div className="flex flex-col w-full mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-3 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-primary text-white py-2 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Request Reset Link"}
        </button>
      </div>
    </div>
  );
};

export default Page;
