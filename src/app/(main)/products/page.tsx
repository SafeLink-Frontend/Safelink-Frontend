"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Loading from "@/app/loading";
import { fetchInventoryBySearch } from "@/lib/api";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import useSearchStore from "@/store/useSearchStore";
import LoadingModal from "@/components/LoadingModal";
import ProductCard from "@/components/ProductCard";
import { useFetchInventoryBySearch } from "@/hooks/useFetchInventoryBySearch";
import { useQueryClient } from "@tanstack/react-query";

const Listings = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { query, setQuery } = useSearchStore();
  const { data: inventory, isFetching } = useFetchInventoryBySearch(query);
  const queryClient = useQueryClient();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container border-4 mx-auto mt-12 md:mt-0 p-4 min-h-screen">
        <LoadingModal isOpen={isFetching}>
          <Loading />
        </LoadingModal>
        <div className="w-full flex justify-center">
          <div className="bg-white md:w-[75%] w-[100%] py-2 flex flex-row rounded-md">
            <div className="flex flex-row items-center w-[85%] ml-2 rounded-md  px-2 bg-[#f2f4f8]">
              <IoSearch />
              <input
                placeholder="Search by name or keywords"
                onChange={onChangeText}
                value={query}
                className="bg-[#f2f4f8] ml-2 rounded-md  py-2 outline-none w-full"
              />
            </div>
            <button
              onClick={() =>
                queryClient.fetchQuery({ queryKey: ["search-inventory"] })
              }
              className="bg-primary flex-1 w-full text-white mx-2 px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Search Results ({inventory?.length || 0})
        </h2>
        <Suspense fallback={<Loading />}>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
            {inventory &&
              inventory.length > 0 &&
              inventory.map((data, index) => (
                <ProductCard data={data} key={index} />
              ))}
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default Listings;
