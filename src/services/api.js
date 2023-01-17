import axios from "axios";

const instance = axios.create({
  baseURL: "http://dapi.philmo.ch/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;