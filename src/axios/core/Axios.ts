import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  RejectedFn,
  ResolvedFn,
} from "@/axios/types";
import dispatchRequest from "@/axios/core/dispatchRequest";
import InterceptorManager from "@/axios/core/InterceptorManager";
import mergeConfig from "@/axios/core/mergeConfig";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

export default class Axios {
  interceptors: Interceptors;
  defaults: AxiosRequestConfig;
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === "string") {
      if (!config) config = {};
      config.url = url;
    } else {
      config = url;
    }
    // 合并配置
    config = mergeConfig(this.defaults, config);

    const chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];
    // chain =  [ ...requestInterceptor , { resolve:dispatchRequest , reject:undefined }  , ... responseInterceptor  }]
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor); // 请求拦截器，先添加的后执行
    });
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor); // 响应拦截器，先添加的先执行
    });

    let promise = Promise.resolve(config);
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }
  get<T = any>(
    url: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "get", url });
    return this.request(config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "delete", url });
    return this.request(config);
  }
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "head", url });
    return this.request(config);
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "post", url, data });
    return this.request(config);
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "put", url, data });
    return this.request(config);
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    config = Object.assign(config || {}, { method: "patch", url, data });
    return this.request(config);
  }
}
