"use client";
import Category from "@/components/common/Category";
import Loader from "@/components/common/Loader";
import ProductList from "@/components/product/ProductList";
import {
  fetchAllProductApi,
  selectProduct,
} from "@/redux/product/ProductSlice";
import { addUser, setProduct } from "@/redux/user/userSlice";
import { GetUserApi } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const count = useSelector(selectProduct);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductApi());
    if (!user) {
      getData();
    }
  }, []);
  async function getData() {
    try {
      let token = getCookie("token");
      if (token) {
        const { data } = await axios.get(GetUserApi, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch(addUser(data.result));
        dispatch(setProduct(data?.findProduct));
      } else {
        window.location = "/login";
      }
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <div>
      {!count?.length ? (
        <Loader />
      ) : (
        <Category>
          <ProductList />
        </Category>
      )}
    </div>
  );
};

export default Home;
