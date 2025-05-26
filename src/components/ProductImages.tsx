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
            <div className="grid md:grid-cols-2 grid-cols-1 mb-1 space-x-0 md:space-x-1 space-y-1 md:space-y-0">
              <Image
                width={1000}
                height={1000}
                alt={"product image"}
                src={images[0]} // Replace with your image URL
                className="md:h-[400px] w-[95vw] md:w-[45vw] h-[250px] rounded-md "
              />
              {images.length > 1 && (
                <Image
                  width={1000}
                  height={1000}
                  alt="product image"
                  src={images[1]} // Replace with your image URL
                  className="md:h-[400px] w-[95vw] md:w-[45vw] h-[250px] rounded-md"
                />
              )}
            </div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
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
