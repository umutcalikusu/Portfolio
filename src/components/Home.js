import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Home = () => {
  const handleScroll = () => {
    const workSection = document.getElementById("work");
    workSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div name="home" className="w-full min-h-screen bg-[#1F2544] pt-24">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 flex flex-col justify-center h-full py-16">
        <p className="text-[#ccd6f6] text-lg sm:text-xl font-medium">
          Hi, my name is
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#ccd6f6] mt-2">
          UMUT ÇALIKUŞU
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#8892b0] mt-2">
          I'm a Full Stack Developer.
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px] text-base sm:text-lg">
          I'm a full-stack developer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I'm focused on
          building responsive full-stack web applications.
        </p>
        <div>
          <button
            onClick={handleScroll}
            className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-slate-400 hover:border-slate-400 rounded-md transition-colors duration-300"
          >
            View Work
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight className="ml-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
