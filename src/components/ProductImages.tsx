import Image from "next/image";
import React from "react";

function ProductImages({ images }: { images: string[] }) {
  const otherImages = images?.slice(2);
  //const otherImages = ["asd", "asd", "asd"];
  if (images) {
    return (
      <div className="mt-10 gap-3 grid">
        <>
          <div className="space-y-1 ">
            <div className="grid grid-cols-2 sm:grid-cols-1 mb-1 sm:space-x-0 space-x-1  sm:space-y-1">
              <img
                src={images[0]} // Replace with your image URL
                className="h-[400px] sm:w-[95vw] w-[45vw] sm:h-[250px] rounded-md "
              />
              <img
                src={images[1]} // Replace with your image URL
                className="h-[400px] sm:w-[95vw] w-[45vw] sm:h-[250px] rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-2 gap-2">
              {otherImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="product image"
                  className="h-[150px] w-full border rounded-md"
                />
              ))}
            </div>
          </div>
        </>
      </div>
    );
  }
}

export default ProductImages;
