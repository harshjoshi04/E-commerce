"use client";
import { SetProductId } from "@/redux/adminState/adminSlice";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

const ProductList = ({
  _id,
  title,
  image,
  description,
  category,
  price,
  rating,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <tr key={_id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div>{_id}</div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <img src={image} className="w-10 h-10 object-contain " alt="image" />
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <div className="text-gray-900  whitespace-nowrap w-16 overflow-hidden text-ellipsis">
            {title}
          </div>
        </td>
        <td className="px-7 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="text-gray-900  whitespace-nowrap w-48 overflow-hidden text-ellipsis">
            {description}
          </div>
        </td>
        <td className="px-4 py-5 border-b border-gray-200 bg-white text-sm">
          {category}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{price}</p>
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <span>
            {rating?.rate}({rating?.count})
          </span>
        </td>
        <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
          <BiEdit
            size={26}
            className={`cursor-pointer hover:text-green-500  `}
            onClick={() => {
              dispatch(SetProductId(_id));
              document.getElementById("updateproduct").showModal();
            }}
          />
        </td>
        <td className="px-7 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
          <MdDelete
            size={26}
            className={`cursor-pointer hover:text-red-600  `}
            onClick={() => {
              dispatch(SetProductId(_id));
              window.deleteproduct.showModal();
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default ProductList;
