export type Method = "get" | "post" | "put" | "patch" | "delete";

/**
 * axios 请求参数对象
 */
export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number; //超时时间  毫秒
}

/**
 * axios 响应对象
 */
export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

// todo 两种写法
// export interface AxiosPromise extends Promise<AxiosResponse> { }
export type AxiosPromise<T> = Promise<AxiosResponse<T>>;

/**
 * Axios 错误对象接口
 */
export interface AxiosError extends Error {
  isAxiosError: boolean;
  message: string;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: any;
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}