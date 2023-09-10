import { ADDTOPRODUCT } from "@/utils/Api";
import axios from "axios";
import { getCookies } from "cookies-next";

export const AddToProductApi = async (obj) => {
  const { token } = getCookies("token");
  try {
    const { data } = await axios.post(ADDTOPRODUCT, obj, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (er) {
    console.log(er);
  }
};
