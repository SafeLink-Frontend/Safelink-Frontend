import { register } from "@/actions/authActions";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import PasswordInput from "@/components/PasswordInput";
import SignUpButton from "@/components/SignUpButton";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
//import { useRouter } from "next/navigation"
import { MdCancel } from "react-icons/md";

async function page({
  params,
  searchParams,
}: {
  params: {};
  searchParams?: { [key: string]: string | undefined };
}) {
  // console.log({ params, searchParams });
  const referralCode = searchParams?.code;

  return (
    <div className="flex flex-1 flex-col items-center sm:px-[5%]  max-w-[500px] mx-auto">
      <div className="flex-row w-full flex items-center">
        {/* <Link href={"/"}>
          <MdCancel size={28} />
        </Link> */}
        <div className="w-full flex justify-center mt-4 text-[24px] font-[500]">
          SAFELINK
        </div>
      </div>
      <div>Welcome back</div>
      <form className="flex flex-col w-full mt-8 space-y-4">
        <div className="">
          <div>Email</div>
          <input
            className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
            id="email"
            title="Email"
            name="email"
            placeholder="Enter your email here"
            type="email"
          />
        </div>
        <div className="">
          <div>Username (Preferrably your Business Name)</div>
          <input
            className="border border-[#737373] outline-none focus:border-2 focus:border-primary p-3 w-full rounded-[4px]"
            id="username"
            title="UserName"
            name="username"
            placeholder="Enter your Username here"
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
            defaultValue={referralCode}
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
      <div className="flex flex-row justify-center my-4 items-center space-x-2">
        <div className="border-b w-8 h-0 border-[#a6a6a6]"></div>
        <div className="text-[16px]">OR</div>
        <div className="border-b w-8 h-0 border-[#a6a6a6]"></div>
      </div>
      {/* <button className="flex flex-row py-3 my-2 w-[70%] sm:w-full justify-center space-x-4 items-center border border-black/[0.15] rounded-[4px]">
        <Image width={16} height={16} src={"/google-icon.png"} alt="google" />
        <div>sign up with google</div>
      </button> */}
      <GoogleAuthButton referralCode={referralCode} />

      <div className="flex flex-row w-full justify-center space-x-[2px] mt-2 mb-12">
        <div className="text-[14px] font-medium">Have an account?</div>
        <Link href={"/login"} className="text-blue-500 text-[14px] font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default page;
