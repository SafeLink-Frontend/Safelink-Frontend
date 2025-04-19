import { base64ToFile } from "@/util/convertImage";
import Image from "next/image";
import React from "react";

const PictureCategories = ({
  categories,
}: {
  categories: { title: string; images?: string[] }[];
}) => {
  return (
    <section className="p-6 lg:p-10 xxl:p-16">
      <div className="space-y-6 lg:space-y-10 xxl:space-y-14">
        {categories?.map((category, index) => (
          <div key={index}>
            <h3 className="text-[18px] sm:text-[13px] lg:text-[24px] xxl:text-[30px] text-black/[0.7] font-medium leading-6 lg:leading-8 xxl:leading-10 my-2 lg:my-4 xxl:my-6">
              {category?.title}
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-4 sm:gap-2 lg:gap-6 xxl:gap-8">
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
                  className="w-full h-[50vh] sm:w-[45vw] sm:h-auto lg:h-[60vh] xxl:h-[70vh] rounded object-cover"
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
