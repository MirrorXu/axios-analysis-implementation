export type Method = "get" | "post" | "put" | "patch" | "delete";

export interface AxiosTransFormer {
  (data: any, headers?: any): any;
}
export interface AxiosBasicCredentials {
  username: string;
  password: string;
}
/**
 * axios 请求参数对象
 */
export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number; //超时时间  毫秒
  transformRequest?: AxiosTransFormer | AxiosTransFormer[];
  transformResponse?: AxiosTransFormer | AxiosTransFormer[];
  cancelToken?: CancelToken;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (e: ProgressEvent) => void;
  onDownloadProgress?: (e: ProgressEvent) => void;
  auth?: AxiosBasicCredentials;
  validateStatus?: (httpStatus: number) => boolean; // 校验http状态码
  paramsSerializer?: (params: any) => string; // 自定义序列话params函数
  baseURL?: string;
  [propName: string]: any;
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
export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

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
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T = any>(
    url: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
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

export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance;
  CancelToken: CancelTokenStatic;
  Cancel: CancelStatic;
  isCancel: (v: any) => boolean;
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn | undefined): number;
  eject(id: number): void;
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (err: any): any;
}

// 取消网络请求
export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelExecutor {
  (cancel: Canceler): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken;
  source(): CancelTokenSource;
  // source: () => CancelTokenSource;
}

export interface Cancel {
  message: string;
}

export interface CancelStatic {
  new (message?: string): Cancel;
}
