// components/ServerLoginForm.js
// "use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MdCancel } from "react-icons/md";
import ModalButton from "./ModalButton";
import SignUpButton from "./SignUpButton";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
  return (
    <div className="text-black text-[12px]">
      <div className="flex-row w-full flex items-center">
        <ModalButton actionKey="close">
          <MdCancel size={28} />
        </ModalButton>
        <div className="w-full flex justify-center text-[24px] font-[500] uppercase">
          safelink
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <div>Welcome</div>
      </div>

      <form method="post" className="flex flex-col w-full text-black space-y-2">
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-2 w-full rounded-[4px]"
            id="email"
            name="email"
            placeholder="Enter your email here"
            type="email"
            required
          />
        </div>
        <div className="">
          <div>Username</div>
          <input
            className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
            id="name"
            title="Name"
            name="name"
            placeholder="Enter your Name here"
            type="text"
          />
        </div>

        <PasswordInput id="password" label="Password" />
        <PasswordInput id="confirmPassword" label="Confirm Password" />

        <div className="">
          <div>Referral Code (Optional)</div>
          <input
            className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
            id="referralCode"
            title="referralCode"
            name="referralCode"
            placeholder="Enter a referral code"
            type="text"
          />
        </div>

        <div className="flex flex-row space-x-2 items-start">
          <input type="checkbox"></input>
          <div className="text-xs">
            By clicking here, I state that I have read and understood the{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={"terms-and-conditions"}
              className="text-primary"
            >
              Terms and Conditions.
            </Link>
          </div>
        </div>

        <SignUpButton />
      </form>
      <div className="flex flex-row justify-center mt-2 items-center space-x-2">
        <div className="border-b w-8 h-0 border-[#a6a6a6]"></div>
        <div className="text-[16px]">OR</div>
        <div className="border-b w-8 h-0 border-[#a6a6a6]"></div>
      </div>
      {/* <button className="flex flex-row w-full justify-center space-x-4 items-center border border-black/[0.15] rounded-[4px] py-1">
        <Image width={16} height={16} src={"/google-icon.png"} alt="google" />
        <div>sign up with google</div>
      </button> */}
      <GoogleAuthButton />
      <div className="flex flex-row w-full justify-center items-center space-x-[2px] mt-2">
        <div className="text-[10px] font-medium">Already have an account?</div>
        <ModalButton actionKey="openLogIn">Sign in</ModalButton>
      </div>
    </div>
  );
}
