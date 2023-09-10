import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";

const Panel = () => {
  return (
    <div className="w-full px-8 py-8">
      <p className="text-center text-2xl  font-sans font-medium">
        Why Choose Us
      </p>
      <div className="flex justify-evenly px-6 py-4">
        <div className="flex justify-around py-4">
          <div className="flex gap-6 items-center bg-gray-50 px-8 py-3 rounded-xl">
            <div className="flex items-center bg-blue-600 p-6  text-xl rounded-full">
              <BsBoxSeam color="white" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">Free Shiping</p>
              <p className="text-lg">Free on orders over ₹50</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around py-4">
          <div className="flex  items-center gap-6 bg-gray-50 px-8 py-3 rounded-xl">
            <div className="flex items-center bg-[#62A3A1] p-6  text-xl rounded-full">
              <GiTakeMyMoney color="white" size={26} />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold ">Money Quarantee</p>
              <p className="text-lg capitalize">30 days money back</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around py-4">
          <div className="flex gap-6 items-center bg-gray-50 px-8 py-3 rounded-xl">
            <div className="flex items-center bg-purple-500 p-6  text-xl rounded-full">
              <RiCustomerService2Line color="white" size={26} />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">24/7 Support</p>
              <p className="text-lg capitalize">Friendly Support 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
