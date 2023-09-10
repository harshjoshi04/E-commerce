"use client";
import React, { useEffect, useState } from "react";
import CardsItem from "./CardsItem";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getCookie } from "cookies-next";
import axios from "axios";
import { GETCATEGORY } from "@/utils/Api";
import { Spinner } from "@nextui-org/react";

const CardsSection = () => {
  const [prodcut, setproduct] = useState();
  useEffect(() => {
    if (!prodcut) {
      handleGetProduct();
    }
  }, []);
  async function handleGetProduct() {
    try {
      const token = getCookie("token");
      const {
        data: { data: result },
      } = await axios.get(`${GETCATEGORY}category=electronics`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      let newData = result?.slice(0, 6);
      setproduct(newData);
    } catch (er) {
      if (er) {
        console.log(er);
      }
    }
  }
  return (
    <div className="px-8 my-6 w-full">
      <h2 className="text-2xl font-semibold font-mono mt-8 ">
        Electronics Products
      </h2>
      <div>
        {!!prodcut ? (
          <Swiper
            slidesPerView={5}
            spaceBetween={50}
            Navigation={{
              clickable: true,
            }}
            modules={[Navigation]}
          >
            {prodcut.map((val) => {
              return (
                <SwiperSlide key={val?._id}>
                  <CardsItem {...val} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="flex justify-center">
            <Spinner color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsSection;
