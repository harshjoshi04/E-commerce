import { deleteCookie } from "cookies-next";
import React from "react";

const LogOut = () => {
  return (
    <div>
      <dialog
        id="logout"
        className="modal transition-all w-[20rem] rounded-xl "
      >
        <form method="dialog">
          <div className="flex px-5 py-4 border-b border-gray-200 ">
            <div className="flex items-center justify-center w-6">
              <svg
                className="w-6 h-6 text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-700">
              Warning
            </span>
          </div>

          <div className="px-10 py-5 text-gray-600 capitalize">
            Are sure to want logout ?
          </div>

          <div className="flex justify-end px-5 py-4 gap-3  border-t border-gray-300">
            <button className="px-3 py-2 mr-1 text-sm text-white transition duration-150 bg-orange-500 rounded hover:bg-orange-600">
              Cancel
            </button>
            <button
              className="px-6 py-2 text-sm text-gray-600 transition duration-150 bg-gray-100 rounded hover:text-gray-700"
              onClick={() => {
                deleteCookie("token");
                window.location.assign("/login");
              }}
            >
              Ok
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default LogOut;
