import { FormState } from "@/types/edit-profile";
import React from "react";

interface AddressFormProps {
  form: Partial<FormState>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ form, onChange }) => (
  <div className="flex flex-col items-center">
    <div className="flex flex-col sm:w-full w-[60%] items-start mt-4">
      <label
        className="text-[#252625] flex flex-row font-medium text-[14px] mb-1 leading-3"
        htmlFor="address"
      >
        Address <div className="text-red-700 text-[20px]">*</div>
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        required
        id="address"
        name="address"
        value={form.address || ""}
        onChange={onChange}
        maxLength={70}
      />
    </div>

    <div className="flex flex-col sm:w-full w-[60%] items-start mt-4">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="country"
      >
        Country
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        id="country"
        name="country"
        value={form.country || ""}
        onChange={onChange}
        maxLength={25}
      />
    </div>

    <div className="flex flex-col sm:w-full w-[60%] items-start mt-4">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="state"
      >
        State
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        id="state"
        name="state"
        value={form.state || ""}
        onChange={onChange}
        maxLength={25}
      />
    </div>
  </div>
);
