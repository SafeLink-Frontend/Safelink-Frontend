import QA from "@/components/QA";
import {
  fetchQuestionsAnswersByUserId,
  fetchUserByUsername,
  fetchUserInventory,
} from "@/lib/api";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LoadingModal from "@/components/LoadingModal";
import Loading from "@/app/loading";
import UserProfileHeader from "@/components/UserProfileHeader";
import { headers } from "next/headers";
import { Metadata } from "next";
import AboutMeSection from "@/components/AboutMeSection";

export async function getUser() {
  const headersList = headers();
  const url = headersList.get("referer") || "";
  const username = url.split("/").pop();
  console.log("username", username);

  const user = await fetchUserByUsername(username ?? "");
  const questions =
    user?._id && (await fetchQuestionsAnswersByUserId(user?._id));
  const inventory = user?.id && (await fetchUserInventory(user?._id));
  console.log("user", user);

  return { user, questions, inventory };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { user } = await getUser();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "usesafelink.com"; //|| `https://${headers().get("host")}`;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const ogImageUrl =
    user?.profilePicture || user?.professionalPictures?.[0] || "/logo.png";

  // console.log("baseurl", baseUrl);

  return {
    title: `${user?.username || "Safelink"}`,
    description: user?.about,
    openGraph: {
      title: `${user?.username} | ${user?.email}`,
      description: `${user?.about || "Visit my profile"}`,
      images: [ogImageUrl],
      url: `${baseUrl}/link/${user?.username || user?.email}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user?.username} | ${user?.email}`,
      description: user?.about,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { user, questions, inventory } = await getUser();

  return (
    <div className="w-full  flex-1">
      <LoadingModal isOpen={user === null}>
        {user === null && <Loading />}
      </LoadingModal>

      <div className="w-full">
        {user && <UserProfileHeader user={user} />}
        {questions && questions.length > 0 && <QA questions={questions} />}
      </div>
      {user && inventory && (
        <AboutMeSection user={user} inventory={inventory} />
      )}
    </div>
  );
}
