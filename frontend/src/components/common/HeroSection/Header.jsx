import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-transparent flex justify-center">
      <div className="h-[50vh] flex max-w-[100rem] justify-evenly  text-black ">
        <div className=" w-full flex flex-col justify-center items-center">
          <div className=" flex flex-col pl-32 w-[90%] gap-4 scale-up-center">
            <h1 className="text-4xl font-semibold capitalize font-HeroFont">
              The best Apple Watch apps
            </h1>
            <p className="max-w-7xl  ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia
              asperiores alias vero magnam recusandae adipisci ad vitae
              laudantium quod rem voluptatem eos accusantium cumque.
            </p>
            <div className="my-1 ">
              <Link
                href="/collections"
                className="rounded-lg bg-blue-600 text-white text-lg px-4 py-2  font-semibold"
              >
                Visit for product
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  flex  justify-center items-center img-animation mt-4">
          <img
            src="/shoes.png"
            className="w-[600px] h-[550px]  "
            alt=""
            id="imageAnimation"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
