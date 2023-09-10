"use client";
import { Button } from "@nextui-org/react";
import React from "react";

const EditDialoagBox = () => {
  return (
    <div>
      <dialog
        id="edituser"
        className="modal transition-all w-[35rem]  rounded-md "
      >
        <form method="dialog">
          <div className="w-full">
            <div className="flex flex-col my-4 gap-2 items-center ">
              <p className="my-2 text-xl font-semibold">Edit User</p>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="text"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="w-52">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
                <div className="mt-2 ">
                  <select
                    id="role"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option defaultValue="admin">Admin</option>
                    <option defaultValue="user">User</option>
                  </select>
                </div>
              </div>
              <div className="my-4">
                <Button
                  className="bg-gray-50 border-2 hover:bg-gray-100"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default EditDialoagBox;
