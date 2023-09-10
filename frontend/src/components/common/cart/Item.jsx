import { GETITEM } from "@/utils/Api";
import axios from "axios";
import React from "react";
import { MdClose } from "react-icons/md";
const Item = async ({ productId }) => {
  const { data } = await axios.get(GETITEM + productId);
  return (
    <div className="relative justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start pt-12">
      <img
        src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{data.title}</h2>
          <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value="2"
              min="1"
            />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">259.000 ₭</p>
            <MdClose
              size={20}
              className="absolute top-3 right-4 font-medium transition-all hover:text-red-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
