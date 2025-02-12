import axios from "axios";
import { baseURLPrivateApi } from "./api";


const instance = axios.create({
  baseURL: baseURLPrivateApi,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
