import { GETPRODUCT } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";

export function fetchProductFromAdmin(limit) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getCookie("admintoken");
      const { data } = await axios.get(`${GETPRODUCT}?limit=${limit}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve({ data });
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}
