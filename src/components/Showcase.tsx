"use client";
import useModalStore from "@/store/useModalStore";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import useListStore from "@/store/useListStore";
import Link from "next/link";
import Loading from "@/app/loading";
import { useFetchTopUsers } from "@/hooks/useFetchTopUsers";
import { useFetchStaticUsers } from "@/hooks/useFetchStaticUsers";
import Image from "next/image";
//import { User } from "@/types/user"; // Add this import

interface _Product extends Product {
  _id: { $oid: string };
}

export function Showcase() {
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

  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useListStore();

  const isFavorite = (id: string) => favorites.some((item) => item.id === id);

  const handleFavoriteToggle = (data: _Product) => {
    // Add type annotation

    if (isFavorite(data._id.$oid)) {
      removeFromFavorites(data._id.$oid);
    } else {
      // Add the item to favorites with relevant properties
      addToFavorites({
        id: data._id.$oid,
        title: data.title,
        description: data.description,
        price: data.price,
        currency: data.currency,
        image: data.images[0],
        owner: { id: data.owner._id, phoneNumber: data.owner.phoneNumber },
      });
    }
  };

  const { data: users, isPending, isError } = useFetchTopUsers();
  // const { data: staticUers, isPending: isStaticUsersPending } =
  //   useFetchStaticUsers();
  // const combinedUsers = Array.from(
  //   new Set([...(users || []), ...(staticUers || [])])
  // );

  // console.log("uu", users);

  return (
    <>
      <section className="flex items-center z-50 justify-center text-center bg-[#0D0D0D] p-28 my-5 sm:p-4 lt:p-3 md1:p-16 xxl:p-48">
        <div className="container ">
          <h2 className="font-medium leading-8 text-[24px] lt:text-[20px] lg:text-[32px] xxl:text-[42px] text-center text-white">
            What is <span className="text-[#F2BE5C]">Safelink?</span>
          </h2>
          <p className="text-[14px] lg:text-[16px] xxl:text-[20px] text-white my-2 xxl:my-6">
            SafeLink helps you organize your business details, photos, and
            prices in one simple link. No need to fill up your phone or your
            clients' phones with too many pictures—just send one link! It's
            easier for your customers to buy from you and share your business
            with others.
          </p>
          <Link
            href={"/signup"}
            className="bg-[#F2BE5C] py-2 px-4 rounded border border-[#F2BE5C] text-white my-5 font-medium "
          >
            Create an Account
          </Link>
        </div>
      </section>
      <section className="p-5 lt:p-3">
        <h2 className="text-[#FDAF1E] font-semibold leading-6 text-[24px] lt:text-[20px] lg:text-[32px] xxl:text-[42px] my-5 w-full sm:text-center">
          Our Top Sellers
        </h2>
        {isPending ? (
          <div className="flex justify-center w-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="container grid grid-cols-3 sm:grid-cols-2 lt:grid-cols-1 gap-10 sm:gap-5 lt:gap-3">
            {users &&
              users.length > 0 &&
              users?.map((item, index) => (
                <Link
                  href={{
                    //pathname: `/user/${item?.username?.replace(/\s+/g, "-").toLowerCase()}`,
                    pathname: `/profile/user`,
                    query: {
                      userId: item._id,
                    },
                  }}
                  key={index}
                  className="border-x border-b border-[#000000] rounded-lg flex flex-col"
                >
                  <div className="items-center mb-4 flex flex-col">
                    <div
                      className="w-full h-[200px] sm:h-[150px] lt:h-[130px] lg:h-[300px] xxl:h-[400px] border rounded-lg bg-cover bg-no-repeat relative"
                      style={{
                        backgroundImage: `url(${
                          item?.coverPicture || "/cp-placeholder.png"
                        })`,
                      }}
                    >
                      <div className="absolute -bottom-5 left-3">
                        <Image
                          width={100}
                          height={100}
                          src={item?.profilePicture || "/image7.png"}
                          alt="Profile"
                          className="rounded-full w-12 h-12 bg-cover"
                        />
                      </div>
                    </div>
                    <div className="px-4 sm:px-2 lt:px-1 mt-10 w-full">
                      <h3 className="text-[18px] lt:text-[16px] lg:text-[22px] xxl:text-[28px] break-all text-left leading-6 text-ellipsis text-black my-2">
                        {item?.username || "Seller"}
                      </h3>
                      <p className="text-[#444544F2] text-left leading-5 line-clamp-4 text-[14px] lg:text-[16px] xxl:text-[20px] tracking-wide">
                        {item?.about}
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow mb-4" />
                </Link>
              ))}
          </div>
        )}
      </section>

      <section className="mb-4">
        <div className="h-[50vh] lt:h-[40vh] md:h-[60vh] lg:h-[70vh] xxl:h-[80vh] w-full my-2 relative overflow-hidden">
          {/* Use a proper image element for the background instead of CSS background */}
          <Image
            src="/homepage-image-7.jpg"
            alt="Benefits background"
            fill
            className="object-cover brightness-50 z-0"
            priority
            quality={90}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8">
            <div className="flex flex-col items-center max-w-7xl mx-auto">
              <h2 className="text-white font-bold text-[32px] lt:text-[24px] sm:text-[18px] md:text-[36px] lg:text-[42px] xxl:text-[48px] text-center mb-6 md:mb-8 lg:mb-10">
                Why Choose SafeLink?
              </h2>

              {/* Benefits grid - responsive based on specified breakpoints */}
              <div className="grid grid-cols-3 sm1:grid-cols-1 md1:grid-cols-3 gap-4 lt:gap-2 md:gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
                <div className="text-center bg-black/40 backdrop-blur-sm p-3 lt:p-2 md:p-4 lg:p-6 rounded-lg border border-[#F2BE5C]/20 shadow-lg transform transition-transform hover:scale-105">
                  <h3 className="text-[#F2BE5C] font-semibold text-[18px] lt:text-[16px] sm:text-[14px] md:text-[20px] lg:text-[24px] xxl:text-[28px] mb-2">
                    Showcase Your Business
                  </h3>
                  <p className="text-white text-[14px] lt:text-[12px] sm:text-[12px] md:text-[16px] lg:text-[18px] xxl:text-[20px]">
                    Present your products professionally with photos and details
                    all in one shareable link
                  </p>
                </div>

                <div className="text-center bg-black/40 backdrop-blur-sm p-3 lt:p-2 md:p-4 lg:p-6 rounded-lg border border-[#F2BE5C]/20 shadow-lg transform transition-transform hover:scale-105">
                  <h3 className="text-[#F2BE5C] font-semibold text-[18px] lt:text-[16px] sm:text-[14px] md:text-[20px] lg:text-[24px] xxl:text-[28px] mb-2">
                    Grow Your Audience
                  </h3>
                  <p className="text-white text-[14px] lt:text-[12px] sm:text-[12px] md:text-[16px] lg:text-[18px] xxl:text-[20px]">
                    Easily share your business profile and let customers help
                    spread the word
                  </p>
                </div>

                <div className="text-center bg-black/40 backdrop-blur-sm p-3 lt:p-2 md:p-4 lg:p-6 rounded-lg border border-[#F2BE5C]/20 shadow-lg transform transition-transform hover:scale-105 sm1:col-span-2 md1:col-span-1">
                  <h3 className="text-[#F2BE5C] font-semibold text-[18px] lt:text-[16px] sm:text-[14px] md:text-[20px] lg:text-[24px] xxl:text-[28px] mb-2">
                    Simplify Sales
                  </h3>
                  <p className="text-white text-[14px] lt:text-[12px] sm:text-[12px] md:text-[16px] lg:text-[18px] xxl:text-[20px]">
                    Let customers easily browse your inventory and connect with
                    you directly
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={"/signup"}
              className="mt-6 md:mt-8 lg:mt-10 bg-[#F2BE5C] py-2 px-6 lt:px-4 md:py-3 md:px-8 lg:py-4 lg:px-10 xxl:py-5 xxl:px-12 rounded-lg border-2 border-[#F2BE5C] text-white font-medium text-base md:text-lg lg:text-xl xxl:text-2xl hover:bg-transparent hover:text-[#F2BE5C] transition-all duration-300 shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
