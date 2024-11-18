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
import { Metadata } from "next";
import AboutMeSection from "@/components/AboutMeSection";

export async function getUser(username: string) {
  console.log("username", username);

  const [user, questions, inventory] = await Promise.all([
    fetchUserByUsername(username),
    fetchUserByUsername(username).then((user) =>
      user?._id ? fetchQuestionsAnswersByUserId(user._id) : null
    ),
    fetchUserByUsername(username).then((user) =>
      user?._id ? fetchUserInventory(user._id) : null
    ),
  ]);
  console.log("user", user);

  return { user, questions, inventory };
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const { username } = params;
  const { user } = await getUser(username);

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
      url: `${baseUrl}/link/${encodeURIComponent(user?.username || "")}`,

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

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const { user, questions, inventory } = await getUser(username);
  console.log("username from params", username);

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
      {/* <div>username from params {username}</div> */}
    </div>
  );
}
