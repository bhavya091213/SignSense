import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const DemoTwo = () => {
  const [isLive, setIsLive] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#D9B8C4", "#A88A9C", "#703D57", "#402A2C"];
    const tl = gsap.timeline({ repeat: -1, yoyo: true, smoothChildTiming: true });

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

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen flex flex-col justify-center items-center transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: "linear-gradient(45deg, #D9B8C4 0%, #A88A9C 50%, #703D57 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="grid grid-cols-2 grid-rows-1 w-[90%] h-[95%] space-x-5">
        <div className="bg-quaternary/40 backdrop-blur-md flex flex-col items-center rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10 drop-shadow-lg">Webcam</h2>
          {isLive && <Webcam style={{ borderRadius: "20px" }} />}
        </div>

        <div className="flex flex-col items-center space-y-10 bg-quaternary/40 backdrop-blur-md rounded-2xl">
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
