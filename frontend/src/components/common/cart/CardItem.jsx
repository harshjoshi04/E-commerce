"use client";

import {
  UpdateCartQuantityApi,
  decreaseCart,
  increseCart,
} from "@/redux/user/userSlice";
import { GETITEM } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

const CardItem = ({ _id, productId, quantity, setDelete, DeleteId }) => {
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getItem();
  }, [DeleteId]);
  async function getItem() {
    const token = getCookie("token");

    try {
      const { data } = await axios.get(GETITEM + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setItem(data);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <div className="relative justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start pt-12">
      <img
        src={item?.image}
        alt="product-image"
        className="overflow-hidden  w-full rounded-lg sm:w-40 transition-all hover:scale-110 "
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item?.title}</h2>
          <p className="mt-2 flex items-center gap-2 text-gray-700 text-sm font-medium">
            Rating : {item?.rating?.rate}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#FAF206"
              stroke="currentColor"
              color="#FAF206"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => {
                let obj = {
                  id: _id,
                  quantity,
                  type: "dec",
                };
                dispatch(decreaseCart(productId));
                dispatch(UpdateCartQuantityApi(obj));
              }}
            >
              {" "}
              -{" "}
            </span>
            <span className="h-8 w-8 border flex justify-center items-center cursor-default bg-white text-center text-xs outline-none">
              {quantity}
            </span>
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => {
                let obj = {
                  id: _id,
                  quantity,
                  type: "inc",
                };
                dispatch(increseCart(productId));
                dispatch(UpdateCartQuantityApi(obj));
              }}
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">₹ {item?.price}</p>
            <MdClose
              size={20}
              className="absolute top-3 right-4 font-medium transition-all hover:text-red-500 cursor-pointer"
              onClick={() => {
                window.DeleteItem.showModal();
                setDelete(_id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
