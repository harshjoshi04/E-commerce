"use client";
import React, { useEffect, useState } from "react";
import HearderBlog from "./HearderBlog";
import BlogsList from "./BlogsList";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";

const MainBlog = () => {
  const [allNews, setallNews] = useState([]);
  const [ShowNews, SetShowNews] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(3);
  const [load, setload] = useState(false);
  useEffect(() => {
    if (!ShowNews) {
      handleGetBlogs();
    }
  }, []);
  async function handleGetBlogs() {
    try {
      const {
        data: { data: result },
      } = await axios.get(
        "http://api.mediastack.com/v1/news?access_key=ae0431844d20466fdbaf4e30ad81ea75&keywords=gaming"
      );
      let pageTotal = Math.ceil(result.length / page);
      setTotal(pageTotal);
      setallNews(result);
      let Show = result.slice(0, page);
      SetShowNews(Show);
    } catch (er) {
      if (er) {
        console.log(er);
      }
    }
  }
  const handleAddBlogs = () => {
    if (ShowNews.length <= total) {
      setload(true);
      setTimeout(() => {
        let newPage = page + 3;
        let newShow = allNews.slice(0, newPage);
        SetShowNews(newShow);
        setPage(newPage);
        setload(false);
      }, 2000);
    }
  };
  return (
    <div>
      {ShowNews ? (
        <>
          <HearderBlog />
          <div>
            <div class="flex flex-col justify-center antialiased my-8  gap-5 text-gray-900 ">
              {ShowNews.map((val) => {
                return <BlogsList {...val} />;
              })}
            </div>
            <div className="flex justify-center my-6">
              <Button
                className="bg-gray-900 text-white text-lg hover:bg-gray-800 hover:shadow-lg"
                onClick={handleAddBlogs}
                isLoading={load}
              >
                Load More
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[70vh] w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MainBlog;
