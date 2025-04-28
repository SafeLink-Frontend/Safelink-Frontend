"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import useModalStore from "@/store/useModalStore";
import { FaRegUserCircle } from "react-icons/fa";
import useUserStore from "@/store/useUserStore";
import AlertDialogComponent from "./AlertDialogComponent";
import { useQueryClient } from "@tanstack/react-query";
import { clearUserData } from "@/lib/userDetails";

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathName = usePathname();
  const isActive = pathName === props.href;
  const isActiveClassName = isActive && "text-primary";

  return (
    <Link
      {...props}
      className={`mr-4  ${isActiveClassName} hover:text-primary  focus-visible:text-primary`}
    />
  );
}

export function Nav({ children }: { children: ReactNode }) {
  const { user, setUser } = useUserStore();
  const pathName = usePathname();
  const {
    isLogInModalOpen,
    isSignUpModalOpen,
    isDrawerOpen,
    openLogInModal,
    closeLogInModal,
    openSignUpModal,
    closeSignUpModal,
    openDrawer,
    closeDrawer,
  } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogOut = () => {
    queryClient.invalidateQueries();
    queryClient.removeQueries();
    clearUserData();
    setUser(null);
    router.replace("/login");
  };

  // if (pathName === "/login") return <div></div>;

  useEffect(() => {
    // console.log("is login modal open", isLogInModalOpen);
    closeDrawer();
  }, [pathName]);
  return (
    <>
      {pathName !== "/login" &&
        pathName !== "/signup" &&
        pathName !== "/request-password-reset" &&
        pathName !== "/reset-password" && (
          <div
            className={` bg-black bg-opacity-30 fixed z-30 top-0 left-0  w-full `}
          >
            <div className="max-w-[2000px] mx-auto sm:flex hidden items-center justify-between px-2 ">
              <button className="p-4  " onClick={openDrawer}>
                <FaBars size={24} color="white" />
              </button>
              <div>
                <Link
                  href={"/"}
                  className="w-full flex justify-center bg-transparent"
                >
                  <Image width={100} height={50} alt="logo" src={"/logo.svg"} />
                </Link>
              </div>

              {user?.email ? (
                <div className="">
                  <Link
                    href={{
                      pathname: "/profile",
                      // query: {
                      //   id: user?._id,
                      // },
                    }}
                    className="text-[#f2f2f2]"
                  >
                    {user.profilePicture ? (
                      <img
                        className="w-8 h-8 border-gray-700 border rounded-full"
                        src={user.profilePicture}
                      />
                    ) : (
                      <FaRegUserCircle
                        size={30}
                        color={pathName === "/profile" ? "#f2be56" : "#fff"}
                      />
                    )}
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={openLogInModal}
                    className="border hover:text-primary sm:hidden border-primary rounded-[4px] py-3 px-6 mr-4"
                  >
                    Log In
                  </button>
                  {/* <button
                onClick={openSignUpModal}
                className="bg-primary rounded-[4px] py-3 px-6 hover:text-white hover:bg-primary/[0.8]  focus-visible:text-white"
              >
                Sign Up
              </button> */}
                </>
              )}
            </div>
          </div>
        )}

      <nav className={`bg-black w-full `}>
        <div className="max-w-[2000px] mx-auto flex justify-between text-white sm:hidden h-16 items-center pl-6 pr-4">
          <Link href={"/"}>
            <Image
              alt="logo"
              src={"/logo.svg"}
              className="object-contain"
              width={100}
              height={50}
            />
          </Link>
          <div className="flex flex-row items-center">
            {children}

            {user && (
              <AlertDialogComponent
                action={handleLogOut}
                actionButtonText="Log out"
                description="You are about to be logged out"
                title="Are you sure?"
                triggerButtonText="Log Out"
                backgroundColor="bg-transparent"
                borderColor="border-primary"
                hoverBackgroundColor="bg-red-700/[0.3]"
              />
            )}
            {user ? (
              <Link
                href={{
                  pathname: "/profile",
                  // query: {
                  //   id: user?._id,
                  // },
                }}
                className="ml-2"
              >
                {user.profilePicture ? (
                  <div className="flex space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border border-gray-700"
                      src={user.profilePicture}
                    />
                  </div>
                ) : (
                  <FaRegUserCircle
                    size={30}
                    color={pathName === "/profile" ? "#f2be56" : "#fff"}
                  />
                )}
              </Link>
            ) : (
              <>
                <button
                  onClick={openLogInModal}
                  className="border hover:text-primary sm:hidden border-primary rounded-[4px] py-3 px-6 mr-4"
                >
                  Log In
                </button>
                {/* <button
                onClick={openSignUpModal}
                className="bg-primary rounded-[4px] py-3 px-6 hover:text-white hover:bg-primary/[0.8]  focus-visible:text-white"
              >
                Sign Up
              </button> */}
              </>
            )}
          </div>
        </div>
      </nav>
      {pathName === "/" && (
        <div className="sm:hidden bg-transparent absolute top-15 left-2">
          <button className="p-4  " onClick={openDrawer}>
            <FaBars size={24} color="grey" />
          </button>
        </div>
      )}
    </>
  );
}
