import { AxiosPromise, AxiosRequestConfig } from "@/axios/types";
import dispatchRequest from "@/axios/core/dispatchRequest";

export default class Axios {
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === "string") {
      if (!config) config = {};
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest(config);
  }
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "get", url });
    return this.request(config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "delete", url });
    return this.request(config);
  }
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "head", url });
    return this.request(config);
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "post", url, data });
    return this.request(config);
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "put", url, data });
    return this.request(config);
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { methods: "patch", url, data });
    return this.request(config);
  }
}
