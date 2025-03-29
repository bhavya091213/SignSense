import Webcam from "react-webcam";

import { useState } from "react";
export const Demo = () => {
  const [isLive, setIsLive] = useState(true);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-darkest">
      <div className="grid grid-cols-2 grid-rows-1 w-[90%] h-[95%] space-x-5">
        <div className="bg-quaternary flex flex-col items-center rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10">Webcam</h2>
          {isLive && <Webcam style={{ borderRadius: "20px" }} />}
          {/* Webcam component will go here */}
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
