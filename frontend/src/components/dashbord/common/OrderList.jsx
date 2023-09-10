"use client";
import { ChangeOrderStatus } from "@/helper/adminApi";
import { GETITEM } from "@/utils/Api";
import { Chip } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const OrderList = ({ _id, orderId, fname, lname, products }) => {
  const [item, setproduct] = useState();
  const [active, setactive] = useState(false);
  const [status, setstatus] = useState(products?.status);
  const CheckColor =
    (status == "Pending" && "default") ||
    (status == "Arraving" && "warning") ||
    (status == "Delivered" && "success");
  const Icons = active ? CgClose : BiEdit;
  useEffect(() => {
    handleProduct();
  }, []);
  async function handleProduct() {
    try {
      const token = getCookie("admintoken");
      const { data } = await axios.get(GETITEM + products?.productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setproduct(data);
    } catch (er) {
      if (er) console.log(er);
    }
  }
  return (
    <>
      <tr key={_id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div>{_id}</div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{orderId}</p>
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <div className="text-gray-900 whitespace-no-wrap">
            {fname + " " + lname}
          </div>
        </td>
        <td className="px-7 py-5 border-b border-gray-200 bg-white text-sm">
          <img src={item?.image} className="w-10 h-10 " alt="image" />
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex justify-start pl-12">{products?.quantity}</div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item?.price}</p>
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          {active ? (
            <select
              onChange={(e) => {
                setstatus(e.target.value);
                setactive(!active);
                let obj = {
                  id: products?._id,
                  OStatus: e.target.value,
                };
                ChangeOrderStatus(obj);
              }}
              className="block w-28 rounded-3xl border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="Pending" selected={status == "Pending"}>
                Pending
              </option>
              <option value="Arraving" selected={status == "Arraving"}>
                Arraving
              </option>
              <option value="Delivered" selected={status == "Delivered"}>
                Delivered
              </option>
            </select>
          ) : (
            <Chip variant="dot" color={CheckColor}>
              {status}
            </Chip>
          )}
        </td>
        <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
          <Icons
            size={26}
            onClick={() => setactive(!active)}
            className={`cursor-pointer ${
              active ? "hover:text-red-600" : "hover:text-green-500 "
            } `}
          />
        </td>
      </tr>
    </>
  );
};

export default OrderList;
