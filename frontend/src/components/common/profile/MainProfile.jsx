"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { BsCreditCard } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { LuHome, LuPackage } from "react-icons/lu";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { GetUserApi } from "@/utils/Api";
import { addUser, setProduct } from "@/redux/user/userSlice";
import LogOut from "./LogOut";
import Dialog from "./Dialog";
import Loader from "../Loader";

const MainProfile = ({ children }) => {
  const path = usePathname();
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      getData();
    }
  }, []);
  async function getData() {
    try {
      let token = getCookie("token");
      if (token) {
        const { data } = await axios.get(GetUserApi, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch(addUser(data.result));
        dispatch(setProduct(data?.findProduct));
      } else {
        window.location = "/login";
      }
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <>
      {user ? (
        <div className="flex flex-col mx-auto py-6  h-[87.7vh] transition-all  bg-gray-100 ">
          <div className="flex w-full mx-10 gap-6 h-full">
            <div className="flex flex-col gap-2 w-1/5">
              <div className="relative shadow-sm bg-white w-full flex justify-start gap-3 items-center h-32 rounded">
                <div className=" ">
                  <div className="  ">
                    <img
                      src={!user ? "/person.png" : user?.image}
                      className="rounded-full w-20 h-20  shadow-lg"
                    />
                  </div>
                </div>
                <div>
                  <span>Hi,</span>
                  <p className="text-lg font-bold capitalize">
                    {user ? user?.name : "User Name"}
                  </p>
                  {user && user?.role == "admin" && (
                    <div className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-500">
                      <Link href={"/admin"}>Admin Panel</Link>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={` bg-white w-full transition-all  ${
                  path == "/profile" && "bg-gray-50 border-l-4 border-gray-600"
                }`}
              >
                <Link href="/profile">
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <IoPersonOutline className="text-xl" />
                    <p className="font-medium">Account </p>
                  </div>
                </Link>
              </div>
              <div
                className={` bg-white w-full transition-all   ${
                  path == "/orders" && "bg-gray-50 border-l-4 border-gray-600"
                }`}
              >
                <Link href="/orders">
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <LuPackage className="text-md " />
                    <p className="font-medium">My Order </p>
                  </div>
                </Link>
              </div>
              <div
                className={` bg-white w-full transition-all   ${
                  path == "/change-password" &&
                  "bg-gray-50 border-l-4 border-gray-600"
                }`}
              >
                <Link href="/change-password">
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <FiLock className="text-md" />
                    <p className="font-medium">Change Password</p>
                  </div>
                </Link>
              </div>
              <div
                className={` bg-white w-full transition-all   ${
                  path == "/address-book" &&
                  "bg-gray-50 border-l-4 border-gray-600"
                }`}
              >
                <Link href="/address-book">
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <LuHome className="text-md" />
                    <p className="font-medium">Address Book</p>
                  </div>
                </Link>
              </div>
              <div
                className={` bg-white w-full transition-all   ${
                  path == "/payment-method" &&
                  "bg-gray-50 border-l-4 border-gray-600"
                }`}
              >
                <Link href="/payment-method">
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <BsCreditCard className="text-md" />
                    <p className="font-medium">Payment Methods</p>
                  </div>
                </Link>
              </div>
              <div className="bg-white w-full transition-all  cursor-pointer ">
                <div
                  onClick={() => {
                    // deleteCookie("token");
                    // window.href = "/login";
                    window.logout.showModal();
                  }}
                >
                  <div className="grid grid-flow-col justify-start px-6  items-center gap-3 p-2.5 rounded shadow">
                    <BiLogOutCircle className="text-md" />
                    <p className="font-medium">Logout</p>
                  </div>
                </div>
              </div>
              <LogOut />
            </div>

            <div className="w-9/12 mr-2 rounded shadow-sm bg-white ">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MainProfile;
