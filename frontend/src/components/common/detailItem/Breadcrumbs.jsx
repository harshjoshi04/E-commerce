import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ category }) => {
  return (
    <Breadcrumbs
      className=""
      separator={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      }
    >
      <Link
        href="/home"
        className="transition-all opacity-80 hover:opacity-100"
      >
        Home
      </Link>
      <Link
        href="/collections"
        className="transition-all opacity-80 hover:opacity-100"
      >
        Collection
      </Link>
      <p>{category}</p>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
