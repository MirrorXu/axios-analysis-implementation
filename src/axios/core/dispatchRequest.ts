import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "@/axios/types";
import xhr from "@/axios/core/xhr";
import { buildURL } from "@/axios/helpers/url";
import { transformRequest, transformResponse } from "@/axios/helpers/data";
import { processHeaders } from "@/axios/helpers/headers";

// 处理请求配置选项
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

// 处理url ， get请求的 params对象拼接到url上
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  const retUrl = buildURL(url as string, params);
  return retUrl;
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  processHeaders(headers, data);
  return headers;
}

function transformResponseData(response: AxiosResponse) {
  response.data = transformResponse(response.data);
  return response;
}

export default function dispatchRequest<T = any>(
  config: AxiosRequestConfig
): AxiosPromise<T> {
  processConfig(config);
  return xhr(config).then((response) => {
    transformResponseData(response);
    return response;
  });
}
