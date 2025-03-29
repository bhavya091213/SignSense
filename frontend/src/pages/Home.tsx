import { Link } from "react-router";

export const Home = () => {
  const handleGitRepo = () => {
    window.open("https://github.com/bhavya091213/SignSense");
  };
  return (
    <>
      <div className="relative bg-gradient-to-r from-darkest to-quinary px-6 py-24 sm:py-32 lg:px-8 z-0 h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
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
                  <span className="font-extrabold">closer</span>
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
