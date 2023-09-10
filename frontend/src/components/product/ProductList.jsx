"use client";
import { ShowProduct, selectProduct } from "@/redux/product/ProductSlice";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const product = useSelector(ShowProduct);
  return (
    <div className="bg-white  ">
      <div className="mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-1xl lg:px-8">
        <div className="relative mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {product.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
