"use client";
import Loader from "@/components/common/Loader";
import CheckOutPage from "@/components/common/cart/CheckOutPage";
import { addUser, setProduct } from "@/redux/user/userSlice";
import { GetUserApi } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.userData);
  const CartData = useSelector((state) => state.user.productList);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!CartData.length) {
      router.push("/cart");
    } else {
      if (!user) {
        getData();
      }
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
  return <>{!user ? <Loader /> : <CheckOutPage />}</>;
}
