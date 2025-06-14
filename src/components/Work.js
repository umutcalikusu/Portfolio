import React from "react";
import { data } from "../data/data.js";

const Work = () => {
  // projects file
  const project = data;
  //setProject(data);

  return (
    <div
      id="work"
      name="work"
      className="w-full min-h-screen text-gray-300 bg-[#1F2544] py-16"
    >
      <div className="max-w-[1300px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-slate-100">
            Work
          </p>
          <p className="py-6">// Check out some of my recent work</p>
        </div>

        {/* container for projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Grid Item */}
          {project.map((item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${item.image})` }}
              className="shadow-lg shadow-[#040c16] group container rounded-md 
              flex justify-center text-center items-center mx-auto content-div h-[250px]"
            >
              {/* Hover effect for images */}
              <div className="opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-70 rounded-md">
                <span className="text-2xl font-bold text-white tracking-wider px-4">
                  {item.name}
                </span>
                <div className="pt-8 text-center flex flex-wrap justify-center gap-2">
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="text-center rounded-lg px-4 py-3
                       bg-white text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                      Code
                    </button>
                  </a>
                  <a href={item.live} target="_blank" rel="noopener noreferrer">
                    <button
                      className="text-center rounded-lg px-4 py-3
                       bg-white text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                      Live
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
