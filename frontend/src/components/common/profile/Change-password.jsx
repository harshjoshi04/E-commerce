"use client";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "./Dialog";
import { ChangePasswordApi } from "@/helper/authApi";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Please Enter Old Password"),
  password: yup.string().required("Please Enter New Password"),
  comPassword: yup
    .string()
    .required("Please Enter Confirm Password")
    .oneOf([yup.ref("password"), null], "Password must match"),
});
const ChangePassword = () => {
  const [checkPassword, setcheckPassword] = useState({
    old: false,
    newPass: false,
    conPass: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const handleForm = (data) => {
    let obj = {
      oldPassword: data?.oldPassword,
      password: data?.password,
    };
    ChangePasswordApi(obj)
      .then((val) => {
        window.success.showModal();
      })
      .catch((er) => {
        if (er) toast.error("Password is Invalid !");
      });
    reset();
  };
  return (
    <div className="flex max-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Dialog message={"User Password has been changed "} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Change Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
          <div>
            <label
              htmlFor="oldpassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Old Password
            </label>
            <div className="mt-2 relative group">
              <input
                id="oldpassword"
                type="password"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("oldPassword")}
              />
              <div className="absolute bottom-2 right-1 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
                {checkPassword.old ? (
                  <BiHide
                    className="text-xl"
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, old: false };
                      });
                      document.getElementById("oldpassword").type = "password";
                    }}
                  />
                ) : (
                  <BiShow
                    className="text-xl"
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, old: true };
                      });
                      document.getElementById("oldpassword").type = "text";
                    }}
                  />
                )}
              </div>
            </div>
            {errors?.oldPassword && (
              <p className="text-red-500 my-1">
                {errors?.oldPassword?.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
            </div>
            <div className="mt-2 relative group">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password")}
              />
              <div className="absolute bottom-2 right-1 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
                {checkPassword.newPass ? (
                  <BiHide
                    className="text-xl "
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, newPass: false };
                      });
                      document.getElementById("password").type = "password";
                    }}
                  />
                ) : (
                  <BiShow
                    className="text-xl "
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, newPass: true };
                      });
                      document.getElementById("password").type = "text";
                    }}
                  />
                )}
              </div>
            </div>
            {errors?.password && (
              <p className="text-red-500 my-1">{errors?.password?.message}</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="ComPassoword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2 relative group">
              <input
                id="ComPassoword"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("comPassword")}
              />
              <div className="absolute text-gray-600 bottom-2 right-1 cursor-pointer opacity-0 group-hover:opacity-100">
                {checkPassword.conPass ? (
                  <BiHide
                    className="text-xl"
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, conPass: false };
                      });
                      document.getElementById("ComPassoword").type = "password";
                    }}
                  />
                ) : (
                  <BiShow
                    className="text-xl"
                    onClick={() => {
                      setcheckPassword((prev) => {
                        return { ...prev, conPass: true };
                      });
                      document.getElementById("ComPassoword").type = "text";
                    }}
                  />
                )}
              </div>
            </div>
            {errors?.comPassword && (
              <p className="text-red-500 my-1">
                {errors?.comPassword?.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Chnage Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
