import { Link } from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";


// image imports
import eric from "/eric.png";
import aaryan from "/aaryan1.png";
import bhavya from "/bhavya.png";
import mihir from "/mihir.png";

const people = [
  {
    name: "Aaryan Bhardwaj",
    role: "Full Stack Developer",
    imageUrl: aaryan,
    github: "https://github.com/aaryanbhardwaj1",
    linkedin: "https://www.linkedin.com/in/aaryan-bhardwaj1/",
  },
  {
    name: "Bhavya Patel",
    role: "Full Stack Developer",
    imageUrl: bhavya,
    github: "https://github.com/bhavya091213",
    linkedin: "https://www.linkedin.com/in/bhavyap12/",
  },
  {
    name: "Eric Loebs",
    role: "ML Engineer",
    imageUrl: eric,
    github: "https://github.com/1337eric",
    linkedin: "https://www.linkedin.com/in/ericloebs/",
  },
  {
    name: "Mihir Chanduka",
    role: "Backend Developer",
    imageUrl: mihir,
    github: "https://github.com/mihirchanduka",
    linkedin: "https://www.linkedin.com/in/mihirchanduka/",
  },
];
export const Home = () => {
  const blobRef = useRef(null);
  const handleGitRepo = () => {
    window.open("https://github.com/bhavya091213/SignSense");
  };

  useEffect(() => {
    const blob = blobRef.current;

    gsap.to(blob, {
      duration: 20,
      rotate: 360,
      scale: 1.2,
      x: 100,
      y: 50,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Random movement animation
    gsap.to(blob, {
      duration: 15,
      x: "random(-100, 100)",
      y: "random(-50, 50)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <>
      <div className="relative bg-gradient-to-r from-darkest to-quinary px-6 py-24 sm:py-32 lg:px-8 z-0 h-fit">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            ref={blobRef}
            style={{
              clipPath:
                "clip-path: polygon(74% 44.1%, 0% 40.75%, 46.58% 97.09%, 62.5% 28.68%, 85.4% 0.1%, 19.7% 11.46%, 100% 23.27%, 100% 70.65%, 53.55% 100%, 0% 15.25%, 45.1% 34.5%, 34.86% 100%, 0% 64.9%, 17.8% 100%, 23.7% 61.6%, 100% 100%, 76% 97.7%, 96.76% 84.32%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-secondary to-tertiary opacity-20"
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
        <div className="justify-center items-center flex flex-col">
          <div className="w-screen py-24 sm:py-32 lg:px-8 z-0 h-fit">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-4 flex flex-col justify-center items-center">
              <div className="mx-auto max-w-xl xl:col-span-4">
                <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl text-center">
                  Meet our Team
                </h2>
                <p className="mt-6 text-lg font-medium text-secondary text-center">
                  We're a dynamic group of individuals who are passionate about
                  making sign language communication accessible to everyone.
                </p>
              </div>
              <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:col-span-4"
              >
                                {people.map((person) => (
                                  <li key={person.name} className="bg-quaternary/30 backdrop-blur-sm p-6 rounded-xl">
                                    <div className="flex flex-col items-center text-center gap-4">
                                      <img
                                        alt=""
                                        src={person.imageUrl}
                                        className="size-24 rounded-full border-2 border-tertiary/30"
                                      />
                                      <div>
                                        <h3 className="text-xl font-bold tracking-tight text-primary">
                                          {person.name}
                                        </h3>
                                        <p className="text-sm font-semibold text-secondary mt-1">
                                          {person.role}
                                        </p>
                                      </div>
                                      <div className="flex gap-4 mt-2">
                                        <a
                                          href={person.github}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-tertiary hover:text-primary transition-colors"
                                        >
                                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                          </svg>
                                        </a>
                                        <a
                                          href={person.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-tertiary hover:text-primary transition-colors"
                                        >
                                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
