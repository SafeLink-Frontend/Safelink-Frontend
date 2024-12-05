import { useEffect, useRef, useState } from "react";

export const useVideoThumbnail = (
  videoSrc: string,
  captureTime: number = 2
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // console.log("video ref", video);
    // console.log("canvas ref", canvas);

    if (!video || !canvas) return;

    // Capture the frame when the video metadata is loaded
    video.addEventListener("loadedmetadata", () => {
      if (video.duration >= captureTime) {
        video.currentTime = captureTime;
      }
    });

    // Capture the frame when seek is complete
    video.addEventListener("seeked", () => {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnailUrl = canvas.toDataURL("image/jpeg");
        setThumbnail(thumbnailUrl);
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", () => {});
      video.removeEventListener("seeked", () => {});
    };
  }, [videoSrc, captureTime]);

  return { thumbnail, videoRef, canvasRef };
};
