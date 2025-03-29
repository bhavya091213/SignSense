import Webcam from "react-webcam";
import { useRef, useEffect, useCallback } from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";

export const Demo = () => {
  const [isLive, setIsLive] = useState(false);
  const [processingResult, setProcessingResult] = useState<string | null>(null);
  const webcamRef = useRef(null);
  const socketRef = useRef<Socket | null>(null);

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
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-darkest">
      <div className="grid grid-cols-2 grid-rows-1 w-[90%] h-[95%] space-x-5">
        <div className="bg-quaternary flex flex-col items-center rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10">Webcam</h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ borderRadius: "20px" }}
            mirrored={true}
          />
          <button
            onClick={handleToggleLive}
            className="text-sm/6 font-semibold text-white bg-transparent px-3.5 py-2.5 hover:bg-darkest hover:opacity-30 rounded-md"
          >
            {isLive
              ? "Stop Transcription"
              : "Begin Live Transcription/Recording"}
          </button>
        </div>

        <div className="flex flex-col items-center space-y-10 bg-quaternary rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10">
            Options/Output
          </h2>
          <div className="flex flex-col items-center bg-tertiary p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white">English Transcription</h2>
            {/* {processingResult && (
              <p className="text-white mt-4 text-wrap overflow-auto">
                {processingResult}
              </p>
            )} */}
          </div>
          <div className="flex flex-col items-center bg-tertiary p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white">Text To Speech</h2>
            {/* Transcription content will go here */}
          </div>
          <div className="flex flex-col items-center bg-tertiary p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white">Options</h2>
            {/* Transcription content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};
