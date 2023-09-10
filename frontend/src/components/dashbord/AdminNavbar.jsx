"use client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { BsBoxSeamFill, BsPieChartFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ImBoxAdd } from "react-icons/im";
import { MdNotificationsNone } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

const AdminNavbar = ({ children }) => {
  return (
    <div className="grid grid-flow-col auto-cols-fr h-[100vh]">
      <div className="relative bg-gray-800 text-white h-full w-full col-span-1 ">
        <div className="my-12 ">
          <div className="flex justify-center ">
            <p className="text-2xl">Admin Panel</p>
          </div>
          <div className="flex flex-col mt-12 gap-2">
            <Link href="/admin/home">
              <div className="cursor-pointer grid grid-flow-col justify-start items-center gap-4 px-4 py-2  ">
                <BsPieChartFill size={20} />
                <p>Dashboard</p>
              </div>
            </Link>
            <Link href="/admin/coupon">
              <div className="cursor-pointer grid grid-flow-col justify-start items-center gap-4  py-2 px-4">
                <RiCoupon3Fill size={20} />
                <p>Coupons</p>
              </div>
            </Link>
            <Link href="/admin/orders">
              <div className="cursor-pointer grid grid-flow-col justify-start items-center gap-4  px-4 py-2">
                <BsBoxSeamFill size={20} />
                <p>Orders</p>
              </div>
            </Link>
            <Link href="/admin/products">
              <div className="cursor-pointer grid grid-flow-col justify-start items-center gap-4  px-4 py-2">
                <ImBoxAdd size={20} />
                <p>Products</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-7">
          <div className="flex  items-end w-full">
            <Link href="/home">
              <div className="cursor-pointer grid grid-flow-col justify-start items-center gap-4  px-4 py-2">
                <CgLogOut size={20} />
                <p>Exit</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-7 h-full bg-stone-50">
        <div className="h-16 bg-white flex justify-between items-center px-4 border-b-4 border-violet-950">
          <div className="relative text-gray-600">
            <input
              type="search"
              name="serch"
              placeholder="Search"
              className="bg-slate-50 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border"
            />
            <button
              type="submit"
              className="absolute right-0  top-0 mt-3 mr-4 cursor-pointer"
            >
              <FiSearch />
            </button>
          </div>
          <div className="flex h-full items-center gap-3">
            <MdNotificationsNone size={25} />
            <Avatar name="A" className="border shadow bg-gray-200" />
          </div>
        </div>
        <div className=" overflow-auto  h-[93%]">{children}</div>
      </div>
    </div>
  );
};

export default AdminNavbar;
