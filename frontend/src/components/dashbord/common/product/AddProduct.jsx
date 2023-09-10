"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AddProductApi } from "@/helper/adminApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SetDataForProduct } from "@/redux/adminState/adminSlice";

function close() {
  document.getElementById("addproduct").classList.add("scale-out-center");
  setTimeout(() => {
    window.addproduct.close();
    document.getElementById("addproduct").classList.remove("scale-out-center");
  }, 500);
}

const AddProduct = () => {
  const [imageUpload, setimageUpload] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ title, description, price, category, rate, count }) => {
    reset();
    setimageUrl("");
    let obj = {
      title,
      price,
      description,
      category,
      image: imageUpload,
      rating: {
        rate,
        count,
      },
    };
    toast
      .promise(AddProductApi(obj), {
        pending: "Waiting",
        success: "Product Added",
        error: "Something Wrong",
      })
      .then((val) => {
        dispatch(SetDataForProduct());
      })
      .catch((er) => {
        console.log(er);
      });
    close();
  };
  return (
    <div className="" id="showdialog">
      <dialog
        id="addproduct"
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
        <form method="dialog" className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col  px-[20%]">
            <div>
              {imageUrl && (
                <>
                  <div className="flex justify-center w-full">
                    <label htmlFor="imgupload">
                      <img
                        src={imageUrl}
                        className="w-48 h-36 rounded-md shadow-md cursor-pointer"
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
                    id="imgupload"
                    className="hidden"
                    {...register("img", { required: true })}
                    onChange={(e) => {
                      let file = e.target.files[0];
                      if (file.type.split("/")[0] == "image") {
                        setimageUrl(URL.createObjectURL(file));
                        let render = new FileReader();
                        render.readAsDataURL(file);
                        render.onload = () => {
                          const data = render.result;
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
                    {...register("title", { required: true })}
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
                    {...register("description", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    cols="20"
                    rows="5"
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
                    {...register("category", { required: true })}
                    autoComplete="off"
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
                    {...register("price", { required: true })}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      {...register("rate", { required: true })}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      {...register("count", { required: true })}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button className=" my-6 bg-blue-600 text-white" type="submit">
              Add
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddProduct;
