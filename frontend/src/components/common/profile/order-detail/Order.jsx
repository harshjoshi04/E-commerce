"use client";
import { FINDORDERS } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import OrderList from "./OrderList";
import { Spinner } from "@nextui-org/react";
const Orders = () => {
  const [orders, setorders] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    handleGetData();
  }, []);
  async function handleGetData() {
    try {
      const token = await getCookie("token");
      const { data } = await axios.get(FINDORDERS, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setorders(data);
      setload(true);
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <div className=" max-w-7xl mx-auto my-10  pageComing">
      <div className="flex flex-col">
        <div className="m-7 flex  justify-between">
          <span className="text-3xl font-medium capitalize leading-tight">
            My Orders
          </span>
          <div>
            <div className="relative text-gray-600">
              <input
                type="search"
                name="serch"
                placeholder="Search"
                className="bg-slate-50 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none "
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4 cursor-pointer"
              >
                <FiSearch />
              </button>
            </div>
          </div>
        </div>
        {!!orders.length ? (
          <div className="w-full h-[35rem]  overflow-auto">
            <section className="py-1 bg-blueGray-50 ">
              <div className="w-full    px-4 mx-auto ">
                <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6  rounded ">
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse text-left">
                      <thead className="">
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg   whitespace-nowrap font-semibold ">
                            Order Id
                          </th>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg  whitespace-nowrap font-semibold ">
                            Order
                          </th>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg   whitespace-nowrap font-semibold ">
                            Price
                          </th>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg   whitespace-nowrap font-semibold ">
                            Quantity
                          </th>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg   whitespace-nowrap font-semibold ">
                            Payment
                          </th>
                          <th className="px-6 bg-blueGray-50 text-gray-500 align-middle border-b border-solid border-blueGray-100 py-3 text-lg   whitespace-nowrap font-semibold ">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map((val) => {
                          return <OrderList {...val} />;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex justify-center items-center  h-[20rem]">
            {load && !orders.length ? (
              <div className="text-xl text-gray-600 font-medium">
                You dont have any orders....
              </div>
            ) : (
              <Spinner color="default" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
