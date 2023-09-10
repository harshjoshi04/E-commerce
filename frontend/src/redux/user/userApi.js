import { DELETECARTS, REMOVECART, UPDATECART } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export const UpdateCart = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(UPDATECART, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve({ data });
    } catch (er) {
      console.log(er);
      if (er) reject(er);
    }
  });
};

export function RemoveCart(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(REMOVECART + `?id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(data);
    } catch (er) {
      if (er) reject(er);
    }
  });
}

export function DestroyCarts(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "?";
      obj.arr.map((val) => (queryString += "id=" + val + "&"));
      const { data } = await axios.delete(DELETECARTS + queryString, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(obj?.arr);
    } catch (er) {
      if (er) {
        reject(er);
        console.log(er);
      }
    }
  });
}
