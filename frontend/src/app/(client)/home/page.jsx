"use client";
import HeroSection from "@/components/common/HeroSection";
import { addUser, setProduct } from "@/redux/user/userSlice";
import { GetUserApi } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <>
      <HeroSection />
    </>
  );
}
