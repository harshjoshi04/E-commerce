"use client";
import { useEffect, useState } from "react";
import { selectProduct } from "@/redux/product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { FINDUSERPRODUCT } from "@/utils/Api";
import axios from "axios";

const VoiceList = ({ DeleteId }) => {
  const [list, setlist] = useState([]);
  const [total, setTotal] = useState(0);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  const active = useSelector((state) => state.user.active);
  const user = useSelector((state) => state.user.userData);
  const VoiceList = useSelector((state) => state.user.productList);
  const product = useSelector(selectProduct);
  const token = getCookie("token");
  useEffect(() => {
    Show();
  }, [active, VoiceList, product]);
  async function Show() {
    try {
      const { data } = await axios.get(`${FINDUSERPRODUCT}?id=${user?._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setlist(data.data);
      setTotal(data.TotalPrice);
      setTotalQuantity(data.TotalQuanTity);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <>
      {VoiceList.length ? (
        <div className="sticky   mt-6 h-auto rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 grid grid-cols-3 text-center font-bold">
            <p className="text-gray-700">Product</p>
            <p className="text-gray-700">Quantity</p>
            <p className="text-gray-700">Price</p>
          </div>
          {list.map((val) => {
            return (
              <div className="grid grid-cols-3 text-center ">
                <p className="overflow-hidden text-gray-700  text-ellipsis whitespace-nowrap ">
                  {val?.Item?.title}
                </p>
                <p className="text-gray-700 ">{val?.quantity}</p>
                <p className="text-gray-700">₹ {val?.Item?.price}</p>
              </div>
            );
          })}
          <hr className="my-4" />
          <div className="grid grid-cols-3 text-center ">
            <p className="text-lg font-bold w-[54%]">Total</p>
            <p className="text-lg font-bold">{TotalQuantity}</p>
            <p className="text-lg font-bold">₹ {total.toFixed(2)}</p>
          </div>
          {token ? (
            <>
              <Link href={"/checkout"}>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Check out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Please Login First Before Checkout
                </button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default VoiceList;
