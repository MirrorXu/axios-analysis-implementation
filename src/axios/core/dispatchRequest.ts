import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "@/axios/types";
import xhr from "@/axios/core/xhr";
import { buildURL } from "@/axios/helpers/url";
import { flattenHeaders } from "@/axios/helpers/headers";
import transform from "@/axios/core/transform";
import { stLog } from "@/axios/helpers/utils";
// 处理请求配置选项
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config);
  // config.headers = transformHeaders(config);
  // config.data = transformRequestData(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
  stLog("processConfig", config);
}

// 处理url ， get请求的 params对象拼接到url上
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  const retUrl = buildURL(url as string, params);
  return retUrl;
}

function transformResponseData(response: AxiosResponse): any {
  response.data = transform(
    response.data,
    response.config.headers,
    response.config.transformResponse
  );
  return response;
}
export default function dispatchRequest<T = any>(
  config: AxiosRequestConfig
): AxiosPromise<T> {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then((response) => {
    response = transformResponseData(response);
    return response;
  });
}

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
