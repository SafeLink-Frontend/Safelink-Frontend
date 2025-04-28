// components/Footer.js

import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white font-semibold text-[12px]  pt-4 mt-auto">
      <div className="max-w-[2000px] mx-auto sm:px-6 px-16 grid sm:grid-cols-1 grid-cols-4 gap-8">
        <div>
          <div className="flex space-x-4">
            <Link href="https://x.com/usesafelink?t=YyJDe2Xl2hgWfnt0DcJHqA&s=08">
              <FaTwitter className="text-xl hover:text-primary" />
            </Link>
            <Link href="https://www.instagram.com/usesafelink?igsh=enNza3ExcTd0MjFq">
              <FaInstagram className="text-xl hover:text-primary" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61567223234869">
              <FaFacebook className="text-xl hover:text-primary" />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">CATEGORIES</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-primary">
                REAL ESTATE
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                CARS
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">BUSINESS</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-primary">
                AFFILIATE MARKETING
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                LIST WITH US
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">ABOUT</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-primary">
                TEAM
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                CONTACT US
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                PRIVACY POLICY
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto sm:px-6 px-16 mt-10 text-center border-t border-gray-700 pt-6">
        <p className="text-sm">
          &copy; 2022 King David Elites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
