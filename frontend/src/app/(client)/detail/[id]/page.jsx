"use client";
import DetailProduct from "@/components/common/DetailProduct";
import Loader from "@/components/common/Loader";
import { addUser, setProduct } from "@/redux/user/userSlice";
import { GETITEM, GetUserApi } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ params }) => {
  let { id } = params;
  const [load, setload] = useState(false);
  const [product, setproduct] = useState([]);
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  useEffect(() => {
    getProduct();
    if (!user) {
      getData();
    }
  }, []);
  async function getProduct() {
    let token = getCookie("token");
    try {
      const { data } = await axios.get(GETITEM + id, {
        headers: { Authorization: "Bearer " + token },
      });

      setproduct(data);
      setload(true);
    } catch (er) {
      console.log(er);
    }
  }
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
      {load ? (
        <div>
          <DetailProduct data={product} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
