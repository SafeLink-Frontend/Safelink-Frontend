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
  <>
    <div className="flex flex-col items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="username"
      >
        User Name
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
      />
    </div>

    <div className="flex flex-col items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="firstName"
      >
        First Name
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
      />
    </div>

    <div className="flex flex-col items-start gap-2 my-2">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="lastName"
      >
        Last Name
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
      />
    </div>

    <div className="flex flex-col items-start mt-4">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor="about"
      >
        About
      </label>
      <textarea
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        id="about"
        name="about"
        value={form.about || ""}
        onChange={onChange}
      />
    </div>
  </>
);