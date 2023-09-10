"use client";
import { GETITEM } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

export default function CheckOutItem({ productId, quantity }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    getItem();
  }, []);
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
    <div>
      <div className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md" src={item.image} alt="" />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{item.title}</span>
          <span className="float-right text-gray-400 flex items-center gap-2">
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
            <span>{item?.rating?.rate}</span>
          </span>

          <p className="text-md font-bold flex gap-4">
            <span>Price : ₹{item.price}</span>
            <span>Quantity : {quantity}</span>
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}
