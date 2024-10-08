import { AxiosRequestConfig } from "@/axios/types";
import { processHeaders } from "@/axios/helpers/headers";
import { transformRequest } from "@/axios/helpers/data";
import { transformResponse } from "@/axios/helpers/data";
import { stLog } from "@/axios/helpers/utils";
export const defaultsRequestConfig: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      accept: "application/json, text/plain, */*",
    },
  },
  transformRequest: [
    function transRequest(data, headers) {
      stLog.warn("transformRequest", data, headers);
      processHeaders(headers, data);
      data = transformRequest(data);
      return data;
    },
  ],
  transformResponse: [
    function transResponse(data, headers) {
      data = transformResponse(data);
      return data;
    },
  ],
  // xsrf配置被实例替换
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  // 校验http状态码
  validateStatus(httpStatus) {
    return httpStatus >= 200 && httpStatus < 300;
  },
};

const methodsData = ["delete", "get", "head", "options"];
methodsData.forEach((method) => {
  defaultsRequestConfig.headers[method] = {};
});

const methodsWithData = ["post", "put", "patch"];
methodsWithData.forEach((method) => {
  defaultsRequestConfig.headers[method] = {
    "content-type": "application/x-www-form-urlencoded",
  };
});
