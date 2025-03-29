import { Link } from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Home = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const handleGitRepo = () => {
    window.open("https://github.com/bhavya091213/SignSense");
  };
  const blob3Ref = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    [blob1Ref, blob2Ref, blob3Ref].forEach((blobRef, index) => {
      timeline.to(
        blobRef.current,
        {
          duration: 8 + index * 2,
          scale: "random(0.8, 1.5)",
          x: "random(-150, 150)",
          y: "random(-100, 100)",
          rotation: "random(-45, 45)",
          ease: "sine.inOut",
          stagger: {
            amount: 4,
            from: "random",
          },
        },
        "<"
      );
    });
  }, []);

  return (
    <>
      <div className="relative bg-gradient-to-r from-darkest to-quinary px-6 py-24 sm:py-32 lg:px-8 z-0 h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            ref={blob1Ref}
            style={{
              clipPath: "circle(30% at 40% 40%)",
            }}
            className="absolute mx-auto w-[40rem] h-[40rem] bg-gradient-to-br from-secondary to-tertiary opacity-20"
          />
          <div
            ref={blob2Ref}
            style={{
              clipPath: "circle(35% at 60% 60%)",
            }}
            className="absolute mx-auto w-[45rem] h-[45rem] bg-gradient-to-tr from-tertiary to-quaternary opacity-20 left-20"
          />
          <div
            ref={blob3Ref}
            style={{
              clipPath: "circle(25% at 50% 50%)",
            }}
            className="absolute mx-auto w-[35rem] h-[35rem] bg-gradient-to-bl from-quaternary to-secondary opacity-20 right-20"
          />
        </div>
        {/* Hero Page */}
        <div className="">
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl pb-24  pt-10 h-[50%]">
              <div className=" flex flex-col text-center justify-center items-center">
                <h1 className="lg:text-9xl font-extrabold tracking-tight text-balance text-primary xs:text-7xl">
                  SignSense
                </h1>
                <p className="mt-8 text-lg font-medium text-semibold text-secondary sm:text-xl/8">
                  Bringing humanity{" "}
                  <span className="font-extrabold">closer,</span>
                </p>
                <p className="mt-2 text-lg font-medium text-semibold text-secondary sm:text-xl/8">
                  Revolutionizing Accessibility with AI-Powered Sign Language
                  Translation.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/demo"
                    className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-secondary hover:drop-shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Demo
                  </Link>
                  <button
                    onClick={handleGitRepo}
                    className="text-sm/6 font-semibold text-white bg-transparent px-3.5 py-2.5 hover:bg-darkest hover:opacity-30 rounded-md"
                  >
                    Github Repository <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rest of the homepage */}
      </div>
    </>
  );
};
