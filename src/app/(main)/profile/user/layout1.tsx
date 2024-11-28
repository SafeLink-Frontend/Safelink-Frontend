import { fetchUserById } from "@/lib/api";
import { Metadata } from "next";
import router from "next/router";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { userId: string };
}): Promise<Metadata> {
  const userId = searchParams.userId;
  if (!userId) {
    return {
      title: "User Not Found | SAFELINK",
      description: "This user profile does not exist",
    };
  }

  try {
    const user = await fetchUserById(router, userId);

    if (!user) {
      return {
        title: "User Not Found | SAFELINK",
        description: "This user profile does not exist",
      };
    }

    return {
      title: `${user.name || user.email} | SAFELINK`,
      description:
        user.about ||
        `Check out ${user.name || user.email}'s business profile and products on SAFELINK`,
      openGraph: {
        title: `${user.name || user.email} | SAFELINK`,
        description:
          user.about ||
          `Check out ${user.name || user.email}'s business profile and products on SAFELINK`,
        images: [
          {
            url:
              user.profilePicture ||
              user.professionalPictures?.[0] ||
              "/logo.png",
            width: 1200,
            height: 630,
            alt: `${user.name || user.email}'s Profile`,
          },
        ],
        type: "profile",
      },
    };
  } catch (error) {
    return {
      title: "Error Loading Profile | SAFELINK",
      description: "There was an error loading this profile",
    };
  }
}

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
