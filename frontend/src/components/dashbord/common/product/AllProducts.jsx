"use client";

import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import {
  FetchProductForAdminApi,
  showAdminProducts,
} from "@/redux/adminState/adminSlice";
import AdminPaggintion from "./AdminPaggintion";
import AddProduct from "./AddProduct";
import ChangeProduct from "./ChangeProduct";
import DeleteProduct from "./DeleteProduct";

const AllProducts = () => {
  const allProduct = useSelector(showAdminProducts);
  const dispatch = useDispatch();
  const change = useSelector((state) => state.dashboard.change);
  useEffect(() => {
    dispatch(FetchProductForAdminApi());
  }, [change]);
  return (
    <>
      <div className="relative w-[98%] mx-4 ">
        <AddProduct />
        <ChangeProduct />
        <DeleteProduct />
        <div className="flex justify-between mx-4 ">
          <p className="my-8 text-2xl font-sans font-medium">All Products</p>
          <div className="flex items-center">
            <Button
              className="text-md flex items-center bg-blue-600 text-white font-sans border"
              onClick={() => {
                window.addproduct.showModal();
                document
                  .getElementById("addproduct")
                  .classList.add("slide-in-top");
              }}
            >
              <MdAddCircleOutline size={20} />
              <span>Add Products</span>
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="-mx-4  overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      rating
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Edit
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allProduct.map((val) => {
                    return <ProductList {...val} key={val?._id} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="my-6 fixed bottom-8  right-4 px-6">
          <AdminPaggintion />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
