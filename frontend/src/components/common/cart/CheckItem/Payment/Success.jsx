"use clinet";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useSelector } from "react-redux";

const Success = () => {
  const OrderId = useSelector((state) => state.orderDetail.ordersId);
  console.log(OrderId);
  return (
    <div>
      <div className="bg-white p-6 mt-10  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>
            {" "}
            Have a great day !{" "}
            <Link href={"/orders"}>
              <span className="text-blue-600 font-medium hover:text-blue-400">
                Check Orders
              </span>
            </Link>{" "}
          </p>
          <div className="py-10 text-center ">
            <a
              href={`http://localhost:8000/api/pay/downloadinvoice/${OrderId}`}
              download="invoice"
            >
              <Button className="text-black bg-white border-2 font-bold hover:bg-black hover:text-white">
                <AiOutlineFilePdf size={16} />
                Download Invoice
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
