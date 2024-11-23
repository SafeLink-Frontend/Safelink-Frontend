import { FormState } from "@/types/edit-profile";
import React from "react";

interface PersonalInfoProps {
  form: Partial<FormState>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoProps> = ({
  form,
  onChange,
}) => (
  <div className="space-y-4 flex flex-col items-center ">
    <div className="flex flex-col w-[60%] sm:w-full items-start gap-2 my-2">
      <label
        className="text-[#252625] flex flex-row items-center font-medium text-[14px] mb-1 leading-3"
        htmlFor="username"
      >
        User Name <div className="text-red-700 text-[20px]">*</div>
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        id="username"
        name="username"
        value={form.username || ""}
        onChange={onChange}
        required
        aria-required="true"
        maxLength={50}
      />
    </div>

    <div className="flex flex-col w-[60%] sm:w-full items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium flex flex-row text-[14px] mb-1 leading-3"
        htmlFor="firstName"
      >
        First Name <div className="text-red-700 text-[20px]">*</div>
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        id="firstName"
        name="firstName"
        value={form.firstName || ""}
        onChange={onChange}
        required
        aria-required="true"
        maxLength={15}
      />
    </div>

    <div className="flex flex-col w-[60%] sm:w-full items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium flex flex-row text-[14px] mb-1 leading-3"
        htmlFor="lastName"
      >
        Last Name <div className="text-red-700 text-[20px]">*</div>
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="text"
        id="lastName"
        name="lastName"
        value={form.lastName || ""}
        onChange={onChange}
        required
        aria-required="true"
        maxLength={15}
      />
    </div>

    <div className="flex flex-col w-[60%] sm:w-full items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium flex flex-row text-[14px] mb-1 leading-3"
        htmlFor="phoneNumber"
      >
        Phone Number 1(Whatsapp number){" "}
        <div className="text-red-700 text-[20px]">*</div>
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={form.phoneNumber || ""}
        onChange={onChange}
        required
        aria-required="true"
        maxLength={15}
      />
    </div>

    {/* <div className="flex flex-col w-[60%] sm:w-full items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="phone2"
      >
        Phone Number 2
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="tel"
        id="phone2"
        name="phone2"
        value={form.phone2 || ""}
        onChange={onChange}
        aria-required="true"
        maxLength={15}
      />
    </div> */}

    <div className="flex flex-col items-start w-[60%] sm:w-full mt-4">
      <label
        className="text-[#252625] font-medium flex flex-row text-[14px] mb-1 leading-3"
        htmlFor="about"
      >
        About
        {/* <div className="text-red-700 text-[20px]">*</div> */}
      </label>
      <textarea
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        id="about"
        name="about"
        value={form.about || ""}
        onChange={onChange}
        // required
        maxLength={250}
      />
    </div>
  </div>
);
