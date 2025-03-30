import { Link } from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
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
      <div className="relative bg-gradient-to-r from-darkest to-quinary px-6 py-24 sm:py-32 lg:px-8 z-0 h-screen">
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

        <div className=" w-screen bg-gradient-to-r from-darkest to-quinary py-24 sm:py-32 lg:px-8 z-0 h-screen">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                Meet our leadership
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                We’re a dynamic group of individuals who are passionate about
                what we do and dedicated to delivering the best results for our
                clients.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      alt=""
                      src={person.imageUrl}
                      className="size-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm/6 font-semibold text-indigo-600">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
