import { AxiosRequestConfig } from "@/axios/types";

export const defaultsRequestConfig: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
};

const methodsData = ["delete", "get", "heed", "options"];

methodsData.forEach((method) => {
  defaultsRequestConfig.headers[method] = {};
});

const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach((method) => {
  defaultsRequestConfig.headers[method] = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
});
