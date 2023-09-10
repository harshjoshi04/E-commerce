import React from "react";

const HearderBlog = () => {
  return (
    <div className="relative w-full h-[40vh] bg-black">
      <img
        src="/city.jpg"
        className="w-full h-full object-cover opacity-50 img-animation"
        alt="city"
      />
      <div className="absolute text-white top-0 flex justify-center items-center h-full  w-full">
        <p className="text-4xl font-bold ">Blog's</p>
      </div>
    </div>
  );
};

export default HearderBlog;
