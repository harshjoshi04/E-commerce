"use client";

import { ChageRoles } from "@/helper/adminApi";
import { Avatar, Chip } from "@nextui-org/react";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
const List = ({ _id, name, image, email, role, createdAt }) => {
  const [active, setactive] = useState(false);
  const [player, setrole] = useState(role);
  const Icon = active ? CgClose : BiEdit;
  function newDate(val) {
    let date = new Date(val);
    let newD = date.toLocaleDateString();
    return newD;
  }
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <Avatar src={image} />
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{name}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{email}</p>
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <div className="text-gray-900 whitespace-no-wrap">
            {active ? (
              <>
                <select
                  onChange={(e) => {
                    setrole(e.target.value);
                    setactive(!active);
                    ChageRoles({ _id, role: e.target.value });
                  }}
                  className="block w-28 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="admin" selected={player == "admin"}>
                    Admin
                  </option>
                  <option value="user" selected={player == "user"}>
                    User
                  </option>
                </select>
              </>
            ) : (
              <Chip
                variant="dot"
                color={`${player == "admin" ? "success" : "secondary"}`}
                className="capitalize"
              >
                {player}
              </Chip>
            )}
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {newDate(createdAt)}
          </p>
        </td>
        <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
          <Icon
            size={26}
            className={`cursor-pointer ${
              active ? "hover:text-red-600" : "hover:text-green-500 "
            } `}
            onClick={() => setactive(!active)}
          />
        </td>
      </tr>
    </>
  );
};

export default List;
