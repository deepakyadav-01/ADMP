import { LOGIN_ENDPOINT } from "@/lib/constants/constant";
import axiosInstance from "../api/config";

//login user service

export const loginUser = ({ email, password }) => {
  console.log("this is email" ,email);
  console.log("this is password" ,password);
  return axiosInstance.post(LOGIN_ENDPOINT, { email, password });
 
};

