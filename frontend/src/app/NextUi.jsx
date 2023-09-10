"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const NextUi = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUi;
