"use client";
import { addUserOrderDetail } from "@/redux/order/orderSlice";
import { FINDUSERPRODUCT } from "@/utils/Api";
import axios from "axios";
import { getCookies } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
const people = [
  {
    id: 1,
    state: "Gujrat",
    address: "Shubhashnagar sankar na madir ni pachhal ,Bhavnagar",
    pin: 364001,
  },
];
const CheckOutForm = () => {
  const [addressCheck, setaddressCheck] = useState(true);
  const [addressId, setaddressId] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const token = getCookies("token");

    try {
      const { data } = await axios.get(FINDUSERPRODUCT, {
        headers: {
          Authorization: "Bearer " + token?.token || token,
        },
      });

      setTotal(data.TotalPrice);
    } catch (er) {
      console.log(er);
    }
  }
  const handleFormSubmit = (data) => {
    let obj = null;
    if (!addressCheck) {
      const { state, address, pin } = people[addressId - 1];
      obj = {
        fname: data?.fname,
        lname: data?.lname,
        email: data?.email,
        state,
        address,
        pin,
        totalPayment: Math.ceil(total + (total * 10) / 100),
      };
    } else {
      obj = {
        ...data,
        totalPayment: Math.ceil(total + (total * 10) / 100),
      };
    }
    dispatch(addUserOrderDetail(obj));
  };
  const handlegetData = (e) => {
    setaddressCheck(e.target.value != "None" ? false : true);
    setaddressId(e.target.value);
  };
  return (
    <div className="mt-10  px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <div className="flex gap-7 w-full">
            <div className="flex flex-col">
              <label
                htmlFor="fname"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John"
                  {...register("fname", { required: true })}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdPerson className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lname"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Wick"
                  {...register("lname", { required: true })}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdPerson className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
              {...register("email", { required: true })}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>

          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Billing Address
          </label>
          <div className="flex flex-col items-start gap-2 sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <textarea
                id="billing-address"
                name="billing-address"
                className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                cols="20"
                placeholder="Street Address"
                rows="5"
                disabled={!addressCheck}
                {...register("address", { required: addressCheck })}
              ></textarea>
            </div>
            <input
              type="text"
              name="state"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="State"
              disabled={!addressCheck}
              {...register("state", { required: addressCheck })}
            />
            <input
              type="text"
              name="state-pin"
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Pin"
              disabled={!addressCheck}
              {...register("pin", { required: addressCheck })}
            />
          </div>
          <div className="mt-6 border-t py-2">
            {!!people.length && (
              <ul role="list" className="divide-y divide-gray-100">
                {people.map(({ id, state, address, pin }) => (
                  <li key={id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-2 ml-4">
                      <input
                        type="radio"
                        name="addressList"
                        className="accent-violet-600"
                        value={id}
                        defaultChecked={addressCheck}
                        onClick={handlegetData}
                      />
                      <div className="min-w-0 ml-6 flex-auto ">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {state}
                        </p>
                        <div>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address}
                          </p>
                          <span className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {pin}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-2 ml-4">
                    <input
                      type="radio"
                      name="addressList"
                      className="accent-violet-600"
                      value="None"
                      defaultChecked={addressCheck}
                      onClick={handlegetData}
                    />
                    <div className="min-w-0 ml-6 flex-auto ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        New Address
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500"></p>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">₹ {total}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">
                ₹ {Math.ceil((total * 10) / 100)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ₹ {Math.ceil(total + (total * 10) / 100)}
            </p>
          </div>
        </div>
        <button className="mt-4 mb-8 w-full outline outline-1 outline-black rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-white hover:text-black  ">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
