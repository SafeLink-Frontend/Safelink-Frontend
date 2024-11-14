import { fetchUserById } from "@/lib/api";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  console.log("id", id);

  try {
    const user = await fetchUserById(id);
    if (!user) {
      // console.log("user not found");
      return notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "joinsafelink.com"; //|| `https://${headers().get("host")}`;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const ogImageUrl =
      user.profilePicture || user.professionalPictures?.[0] || "/logo.png";

    // console.log("baseurl", baseUrl);

    return {
      title: `${user.username} | YourApp`,
      description: user.about,
      openGraph: {
        title: `${user.username} | ${user.email}`,
        description: user.about,
        images: [ogImageUrl],
        url: `${baseUrl}/link/${user.username || user.email}`,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${user.username} | ${user.email}`,
        description: user.about,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    return notFound();
  }
}

// Page component
export default async function Page({ params }: { params: { id: string } }) {
  // console.log("params", params);
  const user = await fetchUserById(params.id);
  if (!user) return notFound();

  // Redirect to the actual profile page
  redirect(`/profile/user?userId=${params.id}`);

  // return <div>asdfff</div>;

  // This won't be rendered due to redirect
  return <div>Redirecting...</div>;
}
