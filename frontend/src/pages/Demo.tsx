import Webcam from "react-webcam";
import { useRef, useEffect, useCallback } from "react";
import { useState } from "react";

export const Demo = () => {
  const [isLive, setIsLive] = useState(false);  // Changed initial state to false
  const webcamRef = useRef(null);

  const base64ToBlob = (base64: string) => {
    const parts = base64.split(",");
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  };

  const captureFrameAndUpload = useCallback(() => {
    if (!isLive) return; // Early return if not live
    
    const imageSrc =
      webcamRef.current &&
      (webcamRef.current as unknown as Webcam).getScreenshot();
    if (!imageSrc) return;

    const blob = base64ToBlob(imageSrc);

    const formData = new FormData();
    // Append the frame Blob to the FormData. The key "frame" must match what Multer expects.
    formData.append("frame", blob, "frame.jpg");

    fetch("http://localhost:3000/uploadFrame", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Frame upload result:", data);
      })
      .catch((error) => {
        console.error("Error uploading frame:", error);
      });
  }, [isLive]); // Added isLive to dependencies

  useEffect(() => {
    let intervalId: number | null = null;
    
    if (isLive) {
      intervalId = setInterval(captureFrameAndUpload, 33);
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
            {isLive ? "Stop Transcription" : "Begin Live Transcription/Recording"}
          </button>
        </div>

        <div className="flex flex-col  items-center space-y-10 bg-quaternary rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10">
            Options/Output
          </h2>
          <div className="flex flex-col items-center bg-tertiary p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white">English Transcription</h2>

            {/* Transcription content will go here */}
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
