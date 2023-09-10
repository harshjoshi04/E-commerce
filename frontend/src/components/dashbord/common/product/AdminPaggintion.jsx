"use client";
import { ChangeAdminPage } from "@/redux/adminState/adminSlice";
import { Pagination } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminPaggintion = () => {
  const totalPage = useSelector((state) => state.dashboard.totalPages);
  const dispatch = useDispatch();

  return (
    <div>
      {!!totalPage && (
        <Pagination
          total={totalPage}
          initialPage={1}
          variant="bordered"
          onChange={(page) => {
            dispatch(ChangeAdminPage(page));
          }}
        />
      )}
    </div>
  );
};

export default AdminPaggintion;
