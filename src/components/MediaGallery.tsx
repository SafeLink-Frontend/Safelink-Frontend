import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsLightBox from "./NextJsLightBox";

interface MediaGalleryProps {
  images: string[];
  videos: string[];
}

export function MediaGallery({ images, videos }: MediaGalleryProps) {
  // Combine both images and videos into one slides array.
  const slides = [...images, ...videos].map((src) => ({ src }));

  // State for controlling the lightbox and current slide.
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      {/* Carousel preview using Swiper with navigation */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        navigation={true}
        modules={[Navigation]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.src.endsWith(".mp4") ? (
              <video
                controls
                src={slide.src}
                className="w-full h-[287px] object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
            ) : (
              <img
                src={slide.src}
                alt={`Media ${index}`}
                className="w-full h-[287px] object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox component to display the full carousel view */}
      <Lightbox
        open={lightboxOpen}
        index={currentIndex}
        close={() => setLightboxOpen(false)}
        slides={slides}
        render={{ slide: NextJsLightBox }}
      />
    </div>
  );
}
