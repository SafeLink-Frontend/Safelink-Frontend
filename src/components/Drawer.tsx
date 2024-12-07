"use client";
// components/Drawer.js

import { useState } from "react";
//import NavLink from "next/NavLink";
import { MdClose, MdContactMail, MdDescription } from "react-icons/md";
import {
  FaHome,
  FaList,
  FaEnvelope,
  FaBell,
  FaHeart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "./Nav";
import useModalStore from "@/store/useModalStore";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import useUserStore from "@/store/useUserStore";
import AlertDialogComponent from "./AlertDialogComponent";
import { clearUserData } from "@/lib/userDetails";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

{
  /* <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        openLogInModal={openLogInModal}
        openSignUpModal={openSignUpModal}
      />
      <Modal isOpen={isLogInModalOpen} onClose={closeLogInModal}>
        <LoginForm />
      </Modal>
      <Modal isOpen={isSignUpModalOpen} onClose={closeSignUpModal}>
        <SignupForm
          closeModal={closeSignUpModal}
          openLogInModal={openLogInModal}
        />
      </Modal> */
}

const Drawer = () => {
  const { closeDrawer, openDrawer, isDrawerOpen } = useModalStore();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogOut = () => {
    queryClient.invalidateQueries();
    clearUserData();
    setUser(null);
    router.replace("/login");
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-transform transform  ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white w-80 shadow-lg`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <span>Welcome!</span>
        <button onClick={closeDrawer}>
          <MdClose size={28} />
        </button>
      </div>
      <nav className="flex flex-col space-y-8 p-4">
        <NavLink href="/">
          <div className="flex-row flex items-center space-x-4">
            <FaHome />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink href="/create-listing">
          <div className="flex-row flex items-center space-x-4">
            <FaList />
            <span>Add Product</span>
          </div>
        </NavLink>
        {/* <NavLink href="/messages">
          <div className="flex-row flex items-center space-x-4">
            <FaEnvelope />
            <span>Messages</span>
          </div>
        </NavLink>
        <NavLink href="/notifications">
          <div className="flex-row flex items-center space-x-4">
            <FaBell />
            <span>Notifications</span>
          </div>
        </NavLink> */}
        {/* <NavLink href="/saved">
          <div className="flex-row flex items-center space-x-4">
            <FaHeart />
            <span>Saved Listings</span>
          </div>
        </NavLink> */}
        {user && (
          <NavLink
            href={{
              pathname: "/profile",
              // query: {
              //   id: user?._id,
              // },
            }}
          >
            <div className="flex-row flex items-center space-x-4">
              <FaUser />
              <span>Profile</span>
            </div>
          </NavLink>
        )}
        <hr />
        {/* <NavLink href={"/about"}>
          <div className="flex-row flex items-center space-x-4">
            <MdDescription />
            <span>About</span>
          </div>
        </NavLink> */}
        <a
          href="mailto:usesafelink@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <div className="flex-row flex items-center space-x-4">
            <MdContactMail />
            <span>Contact Us</span>
          </div>
        </a>

        <div className=" flex">
          <AlertDialogComponent
            action={handleLogOut}
            actionButtonText="Log out"
            description="You are about to be logged out"
            title="Are you sure?"
            triggerButtonText="Log Out"
            backgroundColor="bg-transparent"
            borderColor="border-primary"
            hoverBackgroundColor="bg-red-700/[0.3]"
            textColor="text-primary"
            border="border-none"
            closeDrawer={closeDrawer}
          />
        </div>

        {!user && (
          <>
            <NavLink href="/login">
              <div className="flex-row flex items-center space-x-4">
                <FaUser />
                <span>Log in</span>
              </div>
            </NavLink>
            <NavLink href="/login">
              <div className="flex-row flex items-center space-x-4">
                <FaUserCircle />
                <span>Sign up</span>
              </div>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Drawer;
