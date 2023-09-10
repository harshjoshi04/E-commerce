"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";

export const MainNavbar = () => {
  const [MenuShow, setMenuShow] = useState(true);
  const MenuRef = useRef(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.userData);
  const productItem = useSelector((state) => state.user.productList);
  const handleShow = () => {
    setMenuShow(!MenuShow);
  };
  useEffect(() => {
    const handleCheckEvent = (event) => {
      if (event.target.id !== "MenuList") {
        if (MenuRef.current && !MenuRef.current.contains(event.target)) {
          setMenuShow(true);
        }
      }
    };
    document.addEventListener("click", handleCheckEvent);
    return () => {
      document.removeEventListener("click", handleCheckEvent);
    };
  }, []);
  return (
    <div>
      <div className=" flex flex-wrap place-items-center  z-50 bg-transparent">
        <section className="relative mx-auto">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between  text-xl  text-black w-screen z-50 ">
            <div className="px-2 xl:px-12 py-6 flex justify-between mx-2 w-full items-center">
              <p className="text-3xl font-bold font-heading capitalize">
                E-commerce
              </p>
              {/* <!-- Nav Links --> */}
              <ul className="hidden xl:flex  font-semibold font-heading space-x-10 nav">
                <li className=" ">
                  <Link className="hover:text-gray-400" href="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-400" href="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-400" href="/collections">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-400 " href="#">
                    Contact Us
                  </Link>
                </li>
              </ul>

              {/* <!-- Header Icons --> */}
              <div className=" flex items-center gap-6">
                <div className="relative card card-compact ">
                  <Link href="/cart" className="cursor-pointer">
                    <BiShoppingBag size={26} />
                  </Link>
                  <span className="additem inline-flex  absolute -top-1 -right-2 items-center rounded-full  bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                    {productItem.length}
                  </span>
                </div>
                <div className="relative " id="MenuList" ref={MenuRef}>
                  {user ? (
                    <>
                      <Link
                        href={"/profile"}
                        className="avatar cursor-pointer"
                        onClick={handleShow}
                      >
                        <div className="">
                          <img
                            className="inline-block h-[2.575rem] w-[2.575rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                            src={user?.image}
                            alt="Image Description"
                          />
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={"/login"}>Login</Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <!-- Responsive navbar --> */}

            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </div>
    </div>
  );
};
