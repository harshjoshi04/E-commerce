"use client";
import { GETDETAILS } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { HiUserGroup } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
const Main = () => {
  const [detail, setdetail] = useState(null);
  useEffect(() => {
    handleGetDetail();
  }, []);
  async function handleGetDetail() {
    try {
      const token = getCookie("admintoken");
      const { data } = await axios.get(GETDETAILS, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setdetail(data);
    } catch (er) {
      if (er) console.log(er);
    }
  }
  return (
    <div>
      <div className="flex w-full justify-around my-4">
        <div className="w-60 h-20 bg-white  flex items-center justify-between rounded-md shadow-sm border-b-2 border-violet-700">
          <div className="flex flex-col justify-start px-4 items-start">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-md font-bold">
              <CountUp
                duration={2}
                start={0}
                end={Number(detail?.totalUsers) - 1}
              />
            </p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-violet-700 w-12 h-12 mx-4">
            <HiUserGroup size={26} color="white" />
          </div>
        </div>
        <div className="w-60 h-20 bg-white  flex items-center justify-between rounded-md shadow-sm border-b-2 border-green-600">
          <div className="flex flex-col justify-start px-4 items-start">
            <p className="text-sm text-gray-500">Total Payment</p>
            <p className="text-md font-bold">
              <CountUp duration={1} start={0} end={detail?.totalPayment} />
            </p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-green-600 w-12 h-12 mx-4">
            <RiMoneyDollarCircleFill size={26} color="white" />
          </div>
        </div>
        <div className="w-60 h-20 bg-white  flex items-center justify-between rounded-md shadow-sm border-b-2  border-orange-500">
          <div className="flex flex-col justify-start px-4 items-start">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-md font-bold">
              <CountUp duration={2} start={0} end={detail?.totalOrders} />
            </p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-orange-500 w-12 h-12 mx-4">
            <MdShoppingCart size={26} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
