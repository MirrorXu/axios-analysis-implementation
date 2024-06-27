import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "@/axios/types";
import { parseHeaders } from "@/axios/helpers/headers";
import { createError } from "@/axios/helpers/error";
import chalk from "chalk";

export default function xhr<T = any>(
  config: AxiosRequestConfig
): AxiosPromise<T> {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = "get",
      data = null,
      headers,
      responseType,
      timeout,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    // 未请求设置超时时间
    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    // 服务端成功响应
    request.onreadystatechange = function handleReadyStateChange() {
      // console.log(
      //   "handleReadyStateChange:",
      //   ` request.readyState:${request.readyState} ,  request.status:${request.status} `
      // );

      if (request.readyState !== 4) return;

      // 网络错误和请求超时 status都是0
      if (request.status === 0) {
        return;
      }

      // 将字符串headers转为对象形式
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());

      const responseData =
        responseType !== "text" ? request.response : request.responseType;

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };

      // handle request.status
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `异步请求失败，status：${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    };

    // 发生错误
    request.onerror = function handleError(e) {
      reject(createError("网络异常", config, null, request));
    };

    request.ontimeout = function handleTimeout() {
      const error = createError(
        `网络超时，timeout：${timeout}`,
        config,
        null,
        request
      );
      reject(error);
    };

    console.log("### request.setRequestHeader(key , value):", headers);
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });
    console.log(chalk.red("### xhr.send( data ) :"), data);
    request.send(data);
  });
}
