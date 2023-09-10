import React from "react";

const CardsItem = ({ image, title, price }) => {
  return (
    <div className="group my-6 relative w-full max-w-[18rem] max-h-xs p-6 bg-gray-50 rounded-xl shadow-xl  transition-all transform duration-500 overflow-hidden">
      <div className="flex items-center justify-center">
        <img
          className="w-48 h-48 object-contain object-center transition-all  rounded-t-md group-hover:scale-105 "
          src={image}
          alt=""
        />
      </div>
      <div
        className="pt-2  absolute -bottom-[4rem] left-0 w-full transition-all group-hover:bottom-0"
        id="cards"
      >
        <h1 className="text-xl font-bold text-white text-center px-8 whitespace-nowrap w-98 overflow-hidden text-ellipsis ">
          {title}
        </h1>

        <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
          <button className="block text-xl font-semibold whitespace-nowrap w-4 text-clip text-white cursor-auto">
            ₹{price}
          </button>
          <button className="text-lg block font-semibold py-2 px-6 text-white  hover:text-gray-100 border-2 rounded-lg shadow hover:shadow-md transition duration-300">
            Show Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
