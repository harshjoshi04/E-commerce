import {
  ADDPRODUCTFROMADMIN,
  AdminLoginApi,
  CHANGEOPDERSTATUS,
  CHANHEROLE,
  DELETEPRODUCTAPI,
  UPDATEPRODUCTAPI,
} from "@/utils/Api";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
const token = getCookie("admintoken");
export function ChageRoles(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(CHANHEROLE, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve("Done");
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}

export function DashboadLogin(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(AdminLoginApi, obj);
      setCookie("admintoken", data);
      resolve("Done");
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}

export function ChangeOrderStatus(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(CHANGEOPDERSTATUS, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve("Done");
    } catch (er) {
      if (er) console.log(er);
    }
  });
}

export function AddProductApi(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(ADDPRODUCTFROMADMIN, obj, {
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

export function UpdateProductApi(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(UPDATEPRODUCTAPI, obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}

export function DeleteProductApi(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(`${DELETEPRODUCTAPI}?id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}
