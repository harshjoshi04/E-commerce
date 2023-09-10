import React from "react";
import { useSelector } from "react-redux";
import CheckOutItem from "../CheckOutItem";
import CheckOutForm from "./CheckOutForm";

const MainCheckout = () => {
  const userProduct = useSelector((state) => state.user.productList);

  return (
    <div className="grid  mt-6 mx-auto gap-7 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <CheckOutForm />
      <div className="px-4 pt-8 overflow-auto">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 h-[60vh] rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-auto">
          {userProduct.map((val) => {
            return <CheckOutItem {...val} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MainCheckout;
