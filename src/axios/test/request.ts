import axios from "@/axios/index";
import { AxiosInstance, AxiosTransFormer } from "@/axios/types";
import { isPlainObject } from "@/axios/helpers/utils";
import qs from "qs";

const Host = "http://localhost:3000";

// 创建Axios实例
const request: AxiosInstance = axios.create({
  headers: {
    ["test-create"]: Date.now(),
    ["test-common"]: "by axios.create()",
    ["test-common-2"]: 321,
    token: 'by axios.create({token:"xxx"})',
  },
  transformRequest: [
    function setTimeStamp(data, headers) {
      if (data) data._timeStamp = Date.now();
      return data;
    },
    function stringifyData(data, headers) {
      if (data) {
        data = qs.stringify(data);
      }
      return data;
    },
    ...(axios.defaults.transformRequest as AxiosTransFormer[]),
  ],
});

// 公共请求头配置
request.defaults.headers.common["test-common"] =
  "by set defaults.headers.common";

// 拦截器
request.interceptors.request.use((config) => {
  const _token = localStorage.getItem("_token") || "";
  if (isPlainObject(config.headers)) {
    Object.assign(config.headers, { _token });
  } else {
    config.headers = { _token };
  }
  return config;
});

let _counter = 0;
request.interceptors.response.use((response) => {
  // console.log(response);
  if (response && response.data && isPlainObject(response.data as any)) {
    response.data._responseInterceptorTag = ++_counter;
  }
  return response;
}, undefined);

export default request;
