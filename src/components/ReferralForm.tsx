// ReferralForm.tsx
"use client";

import { useFetchMyReferral } from "@/hooks/useFetchMyReferral";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa6";
import { MyReferral } from "@/types/my-referral";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import Loading from "@/app/loading";
import { createApiInstance } from "@/lib/api";

const banks = require("@/data/banks2.json");

export default function ReferralForm() {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const {
    data: myReferral,
    isPending: myReferralPending,
    error,
  } = useFetchMyReferral();

  console.log("dd", myReferral);
  console.log("ee", error);

  const [formData, setFormData] = useState({
    accountName: "",
    bankName: "",
    bankCode: "",
    accountNumber: "",
  });

  useEffect(() => {
    if (myReferral) {
      setFormData({
        accountName: myReferral.accountName || "",
        bankName: myReferral.bankName || "",
        bankCode: myReferral.bankCode || "",
        accountNumber: myReferral.accountNumber || "",
      });
    }
  }, [myReferral, user]);

  const createReferralMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const api = createApiInstance();
      const response = await api.post("/referral/create-referral", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Referral created successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-referral"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReferralMutation.mutate(formData);
  };

  if (myReferralPending) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full mt-8 space-y-4"
    >
      <div className="">
        <div>Account Name</div>
        <input
          className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
          value={formData.accountName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, accountName: e.target.value }))
          }
          placeholder="Enter your Bank Account Name here"
          required
          disabled={myReferral !== null && myReferral !== undefined}
        />
      </div>

      <div className="">
        <div>Bank Name</div>
        <select
          className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
          value={formData.bankCode}
          onChange={(e) => {
            const bank = banks.find(
              (b: { name: string; code: string }) => b.code === e.target.value
            );
            setFormData((prev) => ({
              ...prev,
              bankCode: e.target.value,
              bankName: bank?.name || "",
            }));
          }}
          required
          disabled={myReferral !== null && myReferral !== undefined}
        >
          <option value="">Select your Bank</option>
          {banks.map((bank: { name: string; code: string }) => (
            <option key={bank.code} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <div>Account Number</div>
        <input
          className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
          value={formData.accountNumber}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              accountNumber: e.target.value,
            }))
          }
          type="text"
          maxLength={10}
          pattern="\d{10}"
          required
          disabled={myReferral !== null && myReferral !== undefined}
          placeholder="Enter your account number"
        />
      </div>

      {myReferral?.referralCode && (
        <div className="border flex justify-around items-center py-2 text-center font-semibold border-gray-500">
          {myReferral.referralLink}
          <CopyToClipboard
            text={myReferral.referralLink}
            onCopy={() => toast.success("copied to clipboard")}
          >
            <FaCopy size={24} className="cursor-pointer" />
          </CopyToClipboard>
        </div>
      )}

      <button
        type="submit"
        disabled={createReferralMutation.isPending || myReferral !== undefined}
        className="bg-primary text-white p-3 rounded-[4px] hover:bg-primary/90 disabled:bg-gray-400"
      >
        {createReferralMutation.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
