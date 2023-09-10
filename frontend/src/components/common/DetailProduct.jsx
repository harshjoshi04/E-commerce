"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "./detailItem/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { AddToProductApi } from "@/helper/productApi";
import { addToProduct } from "@/redux/user/userSlice";
import Link from "next/link";

const DetailProduct = ({ data }) => {
  const [like, setlike] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const ProductList = useSelector((state) => state.user.productList);
  useEffect(() => {
    setShopping();
  }, [ProductList]);
  function setShopping() {
    ProductList.map((val) => {
      if (val?.productId == data._id) setlike(true);
    });
  }
  const handleClick = async () => {
    let obj = {
      productId: data?._id,
    };
    const result = await AddToProductApi(obj);
    dispatch(addToProduct(result));
  };
  return (
    <div className="  flex justify-center w-[100%] ">
      <div className=" flex gap-5 flex-col w-[95%]">
        <div className="my-4">
          <Breadcrumb category={data?.category} />
        </div>
        <div className="flex   max-h-full">
          <div className="flex  gap-20">
            <div className="flex">
              <div className="m-2 overflow-hidden">
                <img
                  src={data?.image}
                  alt="Demo"
                  className=" border-none w-full h-96 rounded-md transition-all duration-200 hover:scale-105  img-animation mix-blend-multiply"
                />
              </div>
            </div>
            <div className="mx-4 max-w-4xl">
              <div className="flex flex-col gap-3 px-6 py-2">
                <div className="text-md capitalize font-medium">
                  <p>{data?.category}</p>
                </div>

                <div>
                  <p className="text-3xl font-semibold">{data?.title}</p>
                </div>

                <div className=" gap-3">
                  <div>
                    <span className="font-medium">Rating</span>
                    <div className="my-1">
                      <span className="flex gap-2 my-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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
                        <p>{data?.rating?.rate}</p>
                        <span className="font-semibold">
                          |{" "}
                          <span className="font-normal">
                            {data?.rating?.count} Reviews
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-semibold">₹ {data?.price}</p>
                </div>
                <hr className="" />
                <div>
                  <p className="text-2xl font-medium">About Product</p>
                  <p className="first-letter:text-xl m-2">
                    {data?.description}
                  </p>
                </div>
                <div className="my-2">
                  <div className=" flex items-center gap-5">
                    <div>
                      {!user ? (
                        <Link
                          href={"/cart"}
                          className="transition-all duration-150 px-4 py-2 font-semibold text-xl outline rounded-md outline-1 outline-black hover:text-white hover:bg-black"
                        >
                          Login
                        </Link>
                      ) : (
                        <>
                          {!like ? (
                            <>
                              <button
                                className="bg-gray-900 outline outline-1 outline-black transition-all text-white text-md px-16 rounded-md  font-medium shadow py-2 hover:bg-white hover:text-black"
                                onClick={handleClick}
                              >
                                Add To Cart
                              </button>
                            </>
                          ) : (
                            <Link
                              href={"/cart"}
                              className="transition-all duration-150 px-4 py-2 font-semibold text-xl outline rounded-md outline-1 outline-black hover:text-white hover:bg-black"
                            >
                              Shop Now
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
