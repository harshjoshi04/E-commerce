"use client";
import { DashboadLogin } from "@/helper/adminApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const AdminLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    DashboadLogin(data)
      .then((val) => {
        toast.success("Admin Login SuccessFully");
        router.push("/admin/home");
        reset();
      })
      .catch((er) => {
        toast.error("Invalid Email or Passoword");
      });
  };
  return (
    <div>
      <div className="flex items-center justify-center h-[100vh] ">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-lg border rounded px-12 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Admin Login
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors?.email && (
                <p className="capitalize text-red-600 py-2">
                  Please enter email
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password && (
                <p className="capitalize text-red-600 ">
                  Please enter password
                </p>
              )}
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="px-4 py-2 rounded  text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Gau Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
