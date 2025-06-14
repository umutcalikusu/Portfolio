import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full min-h-screen bg-[#1F2544] flex justify-center items-center p-4 py-16"
    >
      <form
        method="POST"
        action="https://getform.io/f/nbdevoda"
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-slate-100 text-gray-300">
            Contact
          </p>
          <p className="text-gray-300 py-4 text-sm sm:text-base">
            {/* Submit the form below or shoot me an email - umut54709@gmail.com */}
            Submit the form below or shoot me an email - umut54709@gmail.com
          </p>
        </div>
        <input
          className="bg-[#ccd6f6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
          type="text"
          placeholder="Name"
          name="name"
          required
        />
        <input
          className="my-4 p-2 bg-[#ccd6f6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <textarea
          className="bg-[#ccd6f6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
          name="message"
          rows="10"
          placeholder="Message"
          required
        ></textarea>
        <button className="text-white border-2 hover:bg-slate-400 hover:border-slate-400 px-4 py-3 my-8 mx-auto flex items-center rounded-md transition-colors duration-300">
          Let's Collaborate
        </button>
      </form>
    </div>
  );
};

export default Contact;
