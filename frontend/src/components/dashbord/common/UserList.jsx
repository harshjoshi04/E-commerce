"use client";
import React, { useEffect, useState } from "react";
import List from "./List";
import { getCookie } from "cookies-next";
import axios from "axios";
import { GETALLUSERS } from "@/utils/Api";

const UserList = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    handleGetUser();
  }, []);
  async function handleGetUser() {
    try {
      const token = getCookie("admintoken");
      const { data } = await axios.get(GETALLUSERS, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setusers(data);
    } catch (er) {
      if (er) console.log(er);
    }
  }
  return (
    <div className="mt-12 mx-2">
      <div className="flex flex-col mt-6">
        <div className="-mx-4  overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((val) => {
                    return <List {...val} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
