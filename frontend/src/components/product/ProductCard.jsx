"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function ProductCard({ product }) {
  const [like, setlike] = useState(false);
  return (
    <>
      <div
        key={product?.id}
        className="relative m-6 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
      >
        <Link
          className="relative mx-3 mt-10 flex h-60 overflow-hidden justify-center rounded-xl "
          href={`/detail/${product?._id}`}
        >
          <img
            className="transition duration-[0.5s] hover:scale-110 img-animation"
            src={product?.image}
            alt="product image"
          />
        </Link>
        <div className="mt-4 px-5 pb-5">
          <Link href={`/detail/${product?._id}`}>
            <h5 className="text-xl tracking-tight text-slate-900 ">
              {product?.title}
            </h5>
          </Link>
          <div className="mt-2 mb-5 flex items-center justify-between gap-2">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ₹{product?.price}
              </span>
            </p>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#FDE047"
                color="#FDE047"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {product?.rating?.rate}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={`${like ? "#FC0404" : "white"}`}
                color={`${like ? "#FC0404" : "black"}`}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart cursor-pointer transition-opacity"
                onClick={() => setlike(!like)}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
