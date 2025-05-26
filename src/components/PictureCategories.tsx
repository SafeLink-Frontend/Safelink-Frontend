import { base64ToFile } from "@/util/convertImage";
import Image from "next/image";
import React from "react";

const PictureCategories = ({
  categories,
}: {
  categories: { title: string; images?: string[] }[];
}) => {
  return (
    <section className="p-6 lg:p-10 2xl:p-16">
      <div className="space-y-6 lg:space-y-10 2xl:space-y-14">
        {categories?.map((category, index) => (
          <div key={index}>
            <h3 className="text-[18px] max-sm:text-[13px] lg:text-[24px] 2xl:text-[30px] text-black/[0.7] font-medium leading-6 lg:leading-8 2xl:leading-10 my-2 lg:my-4 2xl:my-6">
              {category?.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 max-sm:gap-2 lg:gap-6 2xl:gap-8">
              {category?.images?.map((image, idx) => (
                <Image
                  key={idx}
                  width={1000}
                  height={1000}
                  src={image}
                  // src={URL.createObjectURL(
                  //   base64ToFile(image, `image${index}.png`, "image/png")
                  // )}
                  alt={category?.title}
                  className="w-full h-[200px] lg:h-[300px] rounded object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PictureCategories;
