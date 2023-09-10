"use client";
import { GETITEM } from "@/utils/Api";
import { Chip } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const OrderList = ({ _id, products }) => {
  const [productItem, setproductItem] = useState();
  const StatusColor =
    (products?.status == "Pending" && "default") ||
    (products?.status == "Arraving" && "warning") ||
    (products?.status == "Delivered" && "success");
  useEffect(() => {
    handleGetProduct();
  }, []);
  async function handleGetProduct() {
    try {
      const token = getCookie("token");
      const { data } = await axios.get(GETITEM + products?.productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setproductItem(data);
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <tr className="transition-all text-black group hover:bg-gray-50 ">
      <th className="border-t-0 px-6 align-middle  text-md font-medium whitespace-nowrap p-4 ">
        {_id}
      </th>
      <td className="border-t-0 px-6 align-middle  text-md font-medium whitespace-nowrap p-4 ">
        <img
          src={productItem?.image}
          className="w-12 h-14 transition-all hover:scale-110"
        />
      </td>
      <td className="border-t-0 px-6 align-center  text-md font-medium whitespace-nowrap p-4">
        {Math.floor(productItem?.price)}
      </td>
      <td className="border-t-0 px-14 align-middle  text-md font-medium whitespace-nowrap p-4 ">
        {products?.quantity}
      </td>
      <td className="border-t-0 px-6 align-middle  text-md font-medium whitespace-nowrap p-4">
        Cardit card
      </td>
      <td className="border-t-0 px-1 align-left  text-md font-medium whitespace-nowrap p-4 ">
        <div className=" ">
          <Chip
            color={StatusColor}
            className="border-none"
            size="md"
            variant="dot"
          >
            {products?.status}
          </Chip>
        </div>
      </td>
    </tr>
  );
};

export default OrderList;
