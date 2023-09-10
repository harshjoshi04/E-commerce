"use client";
import React from "react";
import { IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  return (
    <div className="relative h-full overflow-hidden">
      <div className="">
        <div className="border-b-2 border-gray-200 h-48">
          <img
            src="/banner.jpg"
            alt=""
            className="h-full w-full object-center object-cover "
          />
        </div>
        <div className="relative ">
          <div className=" absolute -bottom-16 left-16">
            <img
              src={user?.image}
              className="rounded-full w-36 h-36  shadow-sm shadow-black  border-2 border-white"
            />
          </div>
        </div>
      </div>
      <div className="h-full my-24">
        <div className="grid grid-cols-3 gap-y-6 w-full mx-8">
          <div className="m-4 border w-[80%] h-16 flex items-center justify-around text-xl font-medium rounded-lg">
            <div>{user?.name} </div>
            <div>
              <IoPersonOutline />
            </div>
          </div>
          <div className="m-4 border w-[80%] h-16 flex items-center justify-around text-xl font-medium rounded-lg">
            <div>{user?.email} </div>
            <div>
              <IoMailOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
