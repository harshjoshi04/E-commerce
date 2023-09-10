"use client";

import Link from "next/link";
import { MdArrowBack, MdDone, MdPayment } from "react-icons/md";

import { useSelector } from "react-redux";

import { VscAccount } from "react-icons/vsc";
import MainCheckout from "./CheckItem/MainCheckout";
import MainPayment from "./CheckItem/Payment/MainPayment";
import Success from "./CheckItem/Payment/Success";
const CheckOutPage = () => {
  const OrderUserDetail = useSelector((state) => state.orderDetail.userOrder);
  const OrderStatus = useSelector((state) => state.orderDetail.orderStatus);
  return (
    <div>
      <div className="m-6 ">
        <Link href="/cart">
          <span className="font-medium flex gap-3 cursor-pointer items-center">
            <MdArrowBack fontSize={20} /> <span> Back To The Shoping</span>
          </span>
        </Link>
      </div>
      <div className="w-full py-6">
        <div className="flex justify-center">
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="w-10 h-10 mx-auto bg-green-600 border-2 border-green-600 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  <VscAccount size={24} className="w-full font-semibold" />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base">
              Account Detail
            </div>
          </div>

          <div className="w-1/4">
            <div className="relative mb-2">
              <div
                className="absolute flex align-center items-center align-middle content-center"
                style={{
                  width: " calc(100% - 2.5rem - 1rem)",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div
                    className={` bg-green-300 py-1 rounded transition duration-700 ${
                      !!OrderUserDetail ? "w-fulll" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div
                className={`w-10 h-10 mx-auto  rounded-full text-lg  border-2  flex items-center ${
                  !!OrderUserDetail
                    ? "text-white bg-green-600 border-green-600"
                    : "text-gray-600"
                }`}
              >
                <span className="text-center   w-full flex justify-center items-center">
                  <MdPayment />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base">
              Payment Method
            </div>
          </div>

          <div className="w-1/4">
            <div className="relative mb-2">
              <div
                className="absolute flex align-center items-center align-middle content-center"
                style={{
                  width: " calc(100% - 2.5rem - 1rem)",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div
                    className={` bg-green-300 py-1 rounded transition-all ${
                      OrderStatus == "success" ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div
                className={`w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center border-2 ${
                  OrderStatus == "success"
                    ? "bg-green-600 border-green-600"
                    : "bg-white  border-gray-200"
                }`}
              >
                <span
                  className={`text-center  w-full flex justify-center items-center ${
                    OrderStatus == "success" ? "text-white" : "text-gray-600"
                  } `}
                >
                  <MdDone />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base">Successfully</div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      {!OrderUserDetail && <MainCheckout />}
      {OrderUserDetail && OrderStatus != "success" && (
        <MainPayment total={OrderUserDetail?.totalPayment} />
      )}
      {OrderUserDetail && OrderStatus == "success" && <Success />}
    </div>
  );
};

export default CheckOutPage;
