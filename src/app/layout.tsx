import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import { Nav, NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import Drawer from "@/components/Drawer";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientCustomProvider } from "@/components/QueryClientCustomProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const raleway = Raleway({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-openSans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joinsafelink.com"), // Set the base URL for metadata
  title: "SAFELINK",
  description:
    "SAFELINK helps you tell your prospects and clients about yourself, your business and why they should buy from you",
  openGraph: {
    type: "website",
    title: "SAFELINK",
    siteName: "SAFELINK",
    description:
      "SafeLink helps you organize your business details, photos, and prices in one simple link. No need to fill up your phone or your clients' phones with too many pictures—just send one link! It's easier for your customers to buy from you and share your business with others.",
    //siteName: "safelink",
    images: [
      {
        url: "https://www.joinsafelink.com/homepage-image-2.jpg",
        width: "1200",
        height: "630",
        alt: "SAFELINK Homepage Preview",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "https://www.joinsafelink.com/favicon.ico",
        sizes: "any",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFELINK",
    description:
      "SafeLink helps you organize your business details, photos, and prices in one simple link",
    images: ["/homepage-image-2.jpg"],
  },
};
const googleClientKey = process.env.GOOGLE_CLIENT_KEY || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={googleClientKey}>
        <QueryClientCustomProvider>
          <body className={`${(openSans.className, raleway.className)}`}>
            <Nav>
              <NavLink href={"/create-listing"}>Add Product</NavLink>
              <NavLink href={"/pricing"}>Pricing</NavLink>
            </Nav>
            <Toaster />
            <div className="min-h-[500px]">
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
            <Drawer />
            <LoginModal>
              <LoginForm />
            </LoginModal>
            <SignupModal>
              <SignupForm />
            </SignupModal>

            <Footer />
          </body>
        </QueryClientCustomProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
