import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

const ImageSlider = () => {
  return (
    <div className="w-full px-8 mt-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="font-mono"
      >
        <SwiperSlide>
          <div className="">
            <div className="  gap-2 justify-center transition-all  bg-gray-100 shadow rounded-xl  w-full  xl:flex">
              <div className="scale-up-center">
                <img src="/phone/iphones.png " width={700} height={700} />
              </div>
              <div className="flex flex-col gap-6 my-auto justify-start w-2/6">
                <p className="text-7xl font-bold text-focus-in ">
                  New Experrience Iphone 2023
                </p>
                <p className="text-xl font-light py-4">
                  Because if you understand taste, you can delight people with
                  relevant content and a meaningful experience.
                </p>
                <button className="w-[20%] rounded-xl px-4 py-2 border-2 border-gray-600 text-black">
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <div className="  gap-2 justify-center transition-all  bg-gray-100 shadow rounded-xl  w-full xl:flex">
              <div className="scale-up-center pt-2">
                <img src="/watch.png" width={490} height={490} />
              </div>
              <div className="flex flex-col gap-6 my-auto justify-start xl:w-3/6 ">
                <p className="text-7xl font-bold text-focus-in ">
                  Discover the Ultimate Smartwatch Innovation
                </p>
                <p className="text-xl font-light py-4">
                  Prepare to be amazed by the ultimate innovation in wearable
                  tech. The Smartwatch Hero has arrived, setting new standards
                  in design, functionality, and performance
                </p>
                <button className="w-[20%] rounded-xl px-4 py-2 border-2 border-gray-600 text-black">
                  <span>Buy now</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
