"use client";

import { SignUpUser } from "@/helper/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCamera, MdPhotoCamera } from "react-icons/md";
import { toast } from "react-toastify";

export default function SignUp() {
  const [image, setimage] = useState(null);
  const [imageData, setimageData] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onRegister = (data) => {
    let obj = {
      ...data,
      base64image: imageData,
    };
    let user = SignUpUser(obj);
    reset();
    toast
      .promise(user, {
        pending: "Waiting Few Second",
        success: "SignUp SuccessFully",
        error: "Someting wrong",
      })
      .then(() => {
        router.push("/login");
      });
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onRegister)}>
            <input
              type="file"
              name=""
              id="img"
              className="hidden"
              onChange={(e) => {
                let file = e.target.files[0];
                if (file.type.split("/")[0] == "image") {
                  setimage(URL.createObjectURL(file));
                  let render = new FileReader();
                  render.readAsDataURL(file);
                  render.onload = () => {
                    const data = render.result;
                    console.log(data);
                    setimageData(data);
                  };
                }
              }}
            />
            <div className="flex justify-center ">
              <div className="group w-36  rounded-full transition-all   outline outline-1 outline-gray-200 shadow-md overflow-hidden">
                <label htmlFor="img" className="cursor-pointer relative ">
                  <img
                    src={image ? image : "/person.png"}
                    className="w-full h-36"
                  />
                  {!image && (
                    <div
                      className={`absolute bottom-0  w-full hidden justify-center  group-hover:flex`}
                      id="hoverImg"
                    >
                      <MdPhotoCamera
                        size={28}
                        className="text-gray-50 mt-2 z-50"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  {...register("name", { required: true })}
                  className="block px-2 w-full text-xl font-medium rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.name && (
                  <p className="mt-1 text-red-500 transition-all">
                    Please Enter Name
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="off"
                  {...register("email", { required: true })}
                  className="block w-full text-xl px-2 rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors?.email && (
                  <p className="mt-1 text-red-500 transition-all">
                    Please Enter Email
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: true,
                  })}
                  className="block w-full text-xl px-2 rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors?.password && (
                  <p className="mt-1 text-red-500 transition-all">
                    Please Enter Password
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already are member?
            <Link
              href={"/login"}
              className="font-semibold leading-6 pl-3 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
