import Webcam from "react-webcam";
import { useRef, useEffect, useCallback } from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";
import gsap from "gsap";

export const Demo = () => {
  const [isLive, setIsLive] = useState(false);
  const [processingResult, setProcessingResult] = useState<string | null>(null);
  const webcamRef = useRef(null);
  const socketRef = useRef<Socket | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#D9B8C4", "#A88A9C", "#703D57", "#402A2C"];
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      smoothChildTiming: true,
    });

    tl.to(containerRef.current, {
      duration: 8,
      backgroundImage: `linear-gradient(45deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      ease: "sine.inOut",
    })
      .to(containerRef.current, {
        duration: 8,
        backgroundImage: `linear-gradient(45deg, ${colors[1]} 0%, ${colors[2]} 50%, ${colors[3]} 100%)`,
        ease: "sine.inOut",
      })
      .to(containerRef.current, {
        duration: 8,
        backgroundImage: `linear-gradient(45deg, ${colors[2]} 0%, ${colors[3]} 50%, ${colors[0]} 100%)`,
        ease: "sine.inOut",
      });
  }, []);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("processing-result", (result) => {
      setProcessingResult(result);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const captureFrameAndUpload = useCallback(() => {
    if (!isLive || !socketRef.current) return;

    const imageSrc =
      webcamRef.current &&
      (webcamRef.current as unknown as Webcam).getScreenshot();
    if (!imageSrc) return;

    socketRef.current.emit("video-frame", imageSrc);
  }, [isLive]);

  useEffect(() => {
    let intervalId: number | null = null;

    if (isLive) {
      intervalId = window.setInterval(captureFrameAndUpload, 33) as number;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [captureFrameAndUpload, isLive]);

  const handleToggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex flex-col justify-center items-center transition-all duration-500 ease-in-out"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #D9B8C4 0%, #A88A9C 50%, #703D57 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="grid grid-cols-2 grid-rows-1 w-[90%] h-[95%] space-x-5">
        <div className="bg-quaternary/40 backdrop-blur-md flex flex-col items-center rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10 drop-shadow-lg">
            Webcam
          </h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ borderRadius: "20px" }}
            mirrored={true}
          />
          <button
            onClick={handleToggleLive}
            className="mt-6 text-sm/6 font-semibold text-white bg-tertiary/50 px-6 py-3 hover:bg-tertiary/70 rounded-xl transition-all duration-300"
          >
            {isLive
              ? "Stop Transcription"
              : "Begin Live Transcription/Recording"}
          </button>
        </div>

        <div className="flex flex-col items-center space-y-10 bg-quaternary/40 backdrop-blur-md rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10 drop-shadow-lg">
            Options/Output
          </h2>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">
              English Transcription
            </h2>
            {/* {processingResult && (
             <p className="text-white mt-4 text-wrap overflow-auto">
               {processingResult}
             </p>
           )} */}
          </div>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">
              Text To Speech
            </h2>
          </div>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">Options</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
