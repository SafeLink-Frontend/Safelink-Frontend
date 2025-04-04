import { base64ToFile } from "@/util/convertImage";
import Image from "next/image";
import React from "react";

const PictureCategories = ({
  categories,
}: {
  categories: { title: string; images?: string[] }[];
}) => {
  return (
    <section className="p-6">
      <div className="space-y-6">
        {categories?.map((category, index) => (
          <div key={index}>
            <h3 className="text-[18px] sm:text-[13px] text-black/[0.7] font-medium leading-6 my-2">
              {category?.title}
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:gap-2">
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
                  className="w-[100%] h-[50vh] sm:w-[45vw] sm:h-auto rounded"
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
