"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import Link from "next/link";
import VoiceList from "./VoiceList";
import CancelCart from "./CancelCart";
import { useState } from "react";

const Cart = () => {
  const cartProduct = useSelector((state) => state.user.productList);
  const [DeleteId, setDeleteId] = useState(null);
  return (
    <div className="h-[77vh] bg-gray-50 pt-20  overflow-x-auto">
      <CancelCart DeleteId={DeleteId} setDelete={setDeleteId} />
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto    max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg relative md:w-2/3">
          {cartProduct.length ? (
            cartProduct.map((val) => {
              return (
                <CardItem
                  {...val}
                  setDelete={setDeleteId}
                  DeleteId={DeleteId}
                />
              );
            })
          ) : (
            <div className="ml-2 flex flex-col justify-center mt-20 text-2xl font-medium ">
              <p className="text-center">You don't have any product</p>
              <Link
                href={"/collections"}
                className="text-lg  text-center text-blue-700 hover:opacity-75"
              >
                Continue Shopping...
              </Link>
            </div>
          )}
        </div>
        {/* <!-- Sub total --> */}
        <VoiceList DeleteId={DeleteId} />
      </div>
    </div>
  );
};

export default Cart;
