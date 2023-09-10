import { CHANGEPASSWORD, LoginApi, RegisterApi } from "@/utils/Api";
import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export function LoginUser(result) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(LoginApi, result);
      resolve(data);
    } catch (er) {
      console.log(er);
      reject("Invalid");
    }
  });
}

export function SignUpUser(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(RegisterApi, obj);
      resolve(data);
    } catch (er) {
      console.log(er);
      reject("Invalid");
    }
  });
}

export function ChangePasswordApi(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(CHANGEPASSWORD, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(data);
      resolve("Done");
    } catch (er) {
      console.log(er);
      reject("Invalid");
    }
  });
}
