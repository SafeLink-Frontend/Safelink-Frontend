import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

interface NextJsLightBoxProps {
  slide: any;
  offset: number;
  rect: { width: number; height: number };
}

function isNextJsImage(slide: any) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function NextJsLightBox({
  slide,
  offset,
  rect,
}: NextJsLightBoxProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();

  // Optional: check if the slide should be rendered as a video (if the src ends with .mp4)
  const src: string = slide?.src || slide;
  const isVideo = src.endsWith(".mp4");

  if (isVideo) {
    return (
      <div
        style={{ position: "relative", width: rect.width, height: rect.height }}
      >
        <video
          controls
          src={src}
          className="w-full h-full object-cover"
          onClick={
            offset === 0 ? () => click?.({ index: currentIndex }) : undefined
          }
        />
      </div>
    );
  }

  // Fall back to Next.js Image for images
  if (!isNextJsImage(slide)) return null;

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        width={slide.width || 1000}
        height={slide.height || 1000}
        alt="product image"
        crossOrigin="anonymous"
        src={src}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
