"use client";

import { UpdateProductApi } from "@/helper/adminApi";
import { SetUpdateData } from "@/redux/adminState/adminSlice";
import { GETITEM } from "@/utils/Api";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function close() {
  window.updateproduct.close();
}

const ChangeProduct = () => {
  const [imageUpload, setimageUpload] = useState("");
  const id = useSelector((state) => state.dashboard.productId);
  const [product, Setproduct] = useState("");
  const [active, setactive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      handlegetData();
    }
  }, [id]);

  async function handlegetData() {
    try {
      const token = getCookie("admintoken");
      const { data } = await axios.get(GETITEM + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setactive(false);
      setImageUrl(data?.image);
      Setproduct(data);
    } catch (er) {
      if (er) {
        console.log(er);
      }
    }
  }
  const handleOnUpdate = ({
    title,
    price,
    category,
    description,
    rate,
    count,
  }) => {
    let obj = {
      _id: id,
      title: title || product?.title,
      price: price || product?.price,
      description: description || product?.description,
      category: category || product?.category,
      rating: {
        rate: rate || product?.rating?.rate,
        count: count || product?.rating?.count,
      },
    };
    if (imageUpload) {
      obj.image = imageUpload;
    }
    close();
    toast
      .promise(UpdateProductApi(obj), {
        pending: "Waiting few second",
        success: "Update Successfully",
        error: "Something wrong",
      })
      .then((val) => {
        dispatch(SetUpdateData(val));
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className="" id="showdialog">
      <dialog
        id="updateproduct"
        className="modal relative transition-all w-[45rem] rounded-xl   "
      >
        <div className="p-6">
          <button
            className=" absolute top-4 right-8 transition-all hover:text-red-500"
            onClick={close}
          >
            <MdClose size={20} />
          </button>
        </div>
        <form
          method="dialog"
          className=""
          onSubmit={handleSubmit(handleOnUpdate)}
        >
          <div className="w-full flex flex-col  px-[20%]">
            <div>
              {imageUrl && (
                <>
                  <div className="flex justify-center w-full">
                    <label htmlFor="imgupdate">
                      <img
                        src={imageUrl}
                        className="w-48 h-full rounded-md shadow-md cursor-pointer"
                      />
                    </label>
                  </div>
                </>
              )}
              <div
                className={`${
                  imageUrl && "hidden"
                } flex w-full  items-center justify-center bg-grey-lighter`}
              >
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-500">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Select a file
                  </span>
                  <input
                    type="file"
                    id="imgupdate"
                    className="hidden"
                    {...register("img")}
                    onChange={(e) => {
                      let file = e.target.files[0];
                      if (file.type.split("/")[0] == "image") {
                        console.log("demo");
                        setImageUrl(URL.createObjectURL(file));
                        let render = new FileReader();
                        render.readAsDataURL(file);
                        render.onload = () => {
                          const data = render.result;
                          console.log(data);
                          setimageUpload(data);
                        };
                      }
                    }}
                  />
                </label>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    type="text"
                    autoComplete="off"
                    defaultValue={product?.title}
                    {...register("title")}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dec"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name=""
                    id="dec"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    cols="20"
                    rows="5"
                    defaultValue={product?.description}
                    {...register("description")}
                  ></textarea>
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    type="text"
                    autoComplete="off"
                    defaultValue={product?.category}
                    {...register("category")}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    type="text"
                    autoComplete="off"
                    defaultValue={product?.price}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("price")}
                  />
                </div>
              </div>
              <div className="flex w-full gap-2 mt-4">
                <div>
                  <label
                    htmlFor="rate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Rating
                  </label>
                  <div className="mt-2">
                    <input
                      id="rate"
                      type="text"
                      autoComplete="off"
                      defaultValue={product?.rating?.rate}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("rate")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="count"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Total Reviews
                  </label>
                  <div className="mt-2">
                    <input
                      id="count"
                      type="text"
                      autoComplete="off"
                      defaultValue={product?.rating?.count}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("count")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button className=" my-6 bg-blue-600 text-white" type="submit">
              Update
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ChangeProduct;
