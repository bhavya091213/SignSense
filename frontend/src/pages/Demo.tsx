import Webcam from "react-webcam";
import { useRef, useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import gsap from "gsap";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  // Make sure src is a string
  const audioSrc = typeof src === 'string' ? src : '';
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      // Reset states when src changes
      setIsLoading(true);
      setError(null);
      
      // Add event listeners
      const handleCanPlay = () => setIsLoading(false);
      const handleError = () => {
        setError("Failed to load audio file");
        setIsLoading(false);
      };
      
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('error', handleError);
      
      // Clean up
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [audioSrc]);
  
  return (
      <div className="w-full">
      {isLoading && <p className="text-white mt-2">Loading audio...</p>}
      {error && <p className="text-white mt-2 text-red-500">{error}</p>}
      <audio 
        ref={audioRef}
        controls 
        className="w-full mt-2"
        autoPlay={!isLoading && !error}
      >
        <source src={audioSrc} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export const Demo = () => {
  const [isLive, setIsLive] = useState(false);
  const [videoProcessingResult, setVideoProcessingResult] = useState<string | null>(null);
  const [finalProcessingResult, setFinalProcessingResult] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
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
      setVideoProcessingResult(result); // Set the initial video processing result
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoProcessingResult) {
      const fetchGrammarCorrection = async () => {
        try {
          console.log("Sending for grammar correction:", videoProcessingResult);
          const response = await fetch("http://localhost:3000/grammar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: videoProcessingResult }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Grammar correction received:", data);
            if (data.answer) {
              setFinalProcessingResult(data.answer);
            } else {
              // Fallback if no answer is provided
              setFinalProcessingResult(videoProcessingResult);
              console.error("No grammar correction in response");
            }
          } else {
            console.error("Failed to fetch grammar correction");
            // Use original text as fallback
            setFinalProcessingResult(videoProcessingResult);
          }
        } catch (error) {
          console.error("Error fetching grammar correction:", error);
          // Use original text as fallback
          setFinalProcessingResult(videoProcessingResult);
        }
      };

      fetchGrammarCorrection();
    }
  }, [videoProcessingResult]);

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
      intervalId = window.setInterval(captureFrameAndUpload, 16.667) as number;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [captureFrameAndUpload, isLive]);

  const handleToggleLive = () => {
    setIsLive(!isLive);
  };

  // Track if we've already generated audio for this specific result
  const [processedText, setProcessedText] = useState<string | null>(null);

  useEffect(() => {
    if (finalProcessingResult && finalProcessingResult !== processedText && !isGeneratingAudio) {
      setProcessedText(finalProcessingResult);
      setAudioSrc(null); // Reset audio source when we have a new result
      setIsGeneratingAudio(true);
      console.log("Generating audio for:", finalProcessingResult);
      
      const generateAudio = async () => {
        try {
          const response = await fetch("http://localhost:3000/generate_audio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({ 
              text: finalProcessingResult,
              language_code: "en-us"
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Audio response:", data);
            
            // Extract the URL from the complex object structure
            if (data && data.generated_audio_path && data.generated_audio_path.url) {
              const audioUrl = data.generated_audio_path.url;
              console.log("Audio URL extracted:", audioUrl);
              setAudioSrc(audioUrl);
            } else {
              console.error("Invalid audio path received:", data);
              setAudioSrc("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
            }
          } else {
            console.error("Failed to generate audio");
            setAudioSrc("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
          }
        } catch (error) {
          console.error("Error generating audio:", error);
          setAudioSrc("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
        } finally {
          setIsGeneratingAudio(false);
        }
      };

      generateAudio();
    }
  }, [finalProcessingResult, processedText, isGeneratingAudio]);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen p-20 flex flex-col justify-center items-center xs:space-y-5"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #D9B8C4 0%, #A88A9C 50%, #703D57 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="grid md:grid-cols-2 xs:grid-cols-1 xs:grid-rows-2 md:grid-rows-1 w-[90%] h-fit md:space-x-5">
        <div className="bg-quaternary/40 backdrop-blur-md flex flex-col items-center rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10 drop-shadow-lg">
            Webcam
          </h2>
          <Webcam
            audio={false} 
            ref={webcamRef}
            style={{ borderRadius: "20px", padding: "2 rem" }}
            mirrored={true}
          />
          <button
            onClick={handleToggleLive}
            className="mt-6 mb-6 text-sm/6 font-semibold text-white bg-tertiary/50 px-6 py-3 hover:bg-secondary rounded-xl "
          >
            {isLive
              ? "Stop Transcription"  
              : "Begin Live Transcription/Recording"}
          </button>
        </div>

        <div className="flex flex-col items-center p-5 space-y-10 bg-quaternary/40 backdrop-blur-md rounded-2xl">
          <h2 className="text-white text-6xl font-extrabold p-10 drop-shadow-lg">
            Options/Output
          </h2>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">
              English Transcription
            </h2>
            {finalProcessingResult && (
              <div>
                <p className="text-white mt-4 text-wrap overflow-auto">
                  {finalProcessingResult}
                </p>
                <p className="text-white mt-4 text-wrap overflow-auto">
                  {videoProcessingResult}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">
              Text To Speech
            </h2>
            {isGeneratingAudio && (
              <p className="text-white mt-4">Generating audio...</p>
            )}
            {audioSrc && (
              <div className="w-full">
                <p className="text-white text-sm mt-4 mb-2 break-all">
                  Audio URL: {audioSrc}
                </p>
                <AudioPlayer src={audioSrc} />
                <div className="mt-4">
                  <a 
                    href={audioSrc} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white bg-secondary/70 px-4 py-2 rounded-lg hover:bg-secondary"
                  >
                    Download Audio
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center bg-tertiary/50 p-10 rounded-xl w-[90%]">
            <h2 className="font-semibold text-white drop-shadow-md">Options</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
