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

    config = mergeConfig(this.defaults, config);

    const chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];
    // chain =  [ ...requestInterceptor , { resolve:dispatchRequest , reject:undefined }  , ... responseInterceptor  }]
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
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
