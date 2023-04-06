import axios from "axios";
import { IGetUserLT } from "../type/user.type";

const http = axios.create({
  baseURL: " http://localhost:5001/",
});
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const getUserLS = (): IGetUserLT | "" =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";
export { http, getUserLS };
