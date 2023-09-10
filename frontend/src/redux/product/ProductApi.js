import { GETCATEGORY, GETPRODUCT } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";

export function fetchAllProduct(limit) {
  const token1 = getCookie("token");
  const token2 = getCookie("admintoken");
  const Token = token1 || token2;
  return new Promise(async (resolve) => {
    try {
      const { data } = await axios.get(`${GETPRODUCT}?limit=${limit}`, {
        headers: {
          Authorization: "Bearer " + Token,
        },
      });
      resolve({ data });
    } catch (error) {
      if (error) console.log(error);
    }
  });
}

export function fetchFilterProduct(obj) {
  let { limit, ...filter } = obj;

  let queryString = "";
  const token = getCookie("token");
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  queryString = queryString + `limit=${limit}`;
  return new Promise(async (resolve) => {
    try {
      const { data } = await axios.get(`${GETCATEGORY}${queryString}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve({ data });
    } catch (er) {
      console.log(er);
    }
  });
}
