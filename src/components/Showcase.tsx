"use client";
import useModalStore from "@/store/useModalStore";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import useListStore from "@/store/useListStore";
import Link from "next/link";
import Loading from "@/app/loading";
import { useFetchTopUsers } from "@/hooks/useFetchTopUsers";
import { useFetchStaticUsers } from "@/hooks/useFetchStaticUsers";
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
      <section className="flex items-center z-50 justify-center text-center bg-[#0D0D0D] p-28 my-5 sm:mt-16 sm:p-4">
        <div>
          <h2 className="font-medium leading-8 text-[24px] text-center text-white">
            What is <span className="text-[#F2BE5C]">Safelink?</span>
          </h2>
          <p className="text-[14px] text-white my-2">
            SafeLink helps you organize your business details, photos, and
            prices in one simple link. No need to fill up your phone or your
            clients' phones with too many pictures—just send one link! It's
            easier for your customers to buy from you and share your business
            with others.
          </p>
          <Link
            href={"/signup"}
            className="bg-[#F2BE5C] py-2 px-4 rounded border border-[#F2BE5C] text-white my-5 font-medium"
          >
            Create an Account
          </Link>
        </div>
      </section>
      <section className="p-5">
        <div>
          <h2 className="text-[#FDAF1E] font-semibold leading-6 text-[24px] my-5 w-full sm:text-center">
            Our Top Sellers
          </h2>
        </div>
        {isPending ? (
          <div className="flex justify-center w-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-10 sm:gap-2">
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
                      className="w-full h-[200px] sm:h-[150px] border rounded-lg bg-cover bg-no-repeat relative"
                      style={{
                        backgroundImage: `url(${
                          item?.coverPicture || "/cp-placeholder.png"
                        })`,
                      }}
                    >
                      <div className="absolute -bottom-5 left-3">
                        <img
                          src={item?.profilePicture || "/image7.png"}
                          alt="Profile"
                          className="rounded-full w-12 h-12 bg-cover"
                        />
                      </div>
                    </div>
                    <div className="px-4 sm:px-1 mt-10 w-full">
                      <h3 className="text-[18px] break-all text-left leading-6 text-ellipsis text-black my-2">
                        {item?.username || "Seller"}
                      </h3>
                      <p className="text-[#444544F2] text-left leading-5 line-clamp-4 text-[14px] tracking-wide">
                        {item?.about}
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow mb-4"></div>
                </Link>
              ))}
          </div>
        )}
      </section>

      <section className="mb-4">
        <div className="h-[50vh] w-full my-2 relative">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg_blend brightness-75 contrast-75"
            aria-hidden="true"
          ></div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <h2 className="text-white font-semibold sm:text-lg text-[28px] sm:text-[18px] text-center">
                Present Yourself and Your Business Better with{" "}
                <span className="text-primary uppercase font-semibold text-[28px]">
                  SAFELINK
                </span>
              </h2>
              <p
                id="homepage-about"
                className="text-[#f2f2f2] sm:w-[90%] w-[80%] text-center sm:text-[14px] mt-2"
              >
                SAFELINK helps you tell your prospects and clients about
                yourself, your business, and why they should buy from you.
              </p>
            </div>

            <Link
              href={"/signup"}
              className="bg-[#F2BE5C] py-2 px-4 rounded border border-[#F2BE5C] text-white my-5 font-medium"
            >
              SIGN UP FOR A PROFILE TODAY
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
