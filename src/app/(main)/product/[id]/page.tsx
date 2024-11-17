import Product from "@/components/Product";
import { fetchSingleInventory } from "@/lib/api";
import { Metadata } from "next";
import { useSearchParams } from "next/dist/client/components/navigation";
import { headers } from "next/headers";

export async function getInventory(id: string) {
  console.log("id", id);
  const inventory = await fetchSingleInventory(id);
  return inventory;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const inventory = await getInventory(id);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "usesafelink.com"; //|| `https://${headers().get("host")}`;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const ogImageUrl = inventory?.images[0] || "/logo.png";

  // console.log("baseurl", baseUrl);

  return {
    title: `${inventory?.title || "My product"}`,
    description: inventory?.description ?? "",
    openGraph: {
      title: `${inventory?.title || "My product"}`,
      description: `${inventory?.description || "Check my product"}`,
      images: [ogImageUrl],
      url: `${baseUrl}/product?id=${inventory?._id}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${inventory?.title} | 'My product`,
      description: inventory?.description || "Check my product",
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const inventory = await getInventory(id);
  return (
    <div className="w-full sm:mt-8 flex-1">
      {inventory && <Product inventory={inventory} />}
    </div>
  );
}
