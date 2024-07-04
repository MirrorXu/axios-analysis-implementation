import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "@/axios/types";
import { parseHeaders } from "@/axios/helpers/headers";
import { createError } from "@/axios/helpers/error";
import { stLog } from "@/axios/helpers/utils";

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
      cancelToken,
      withCredentials,
    } = config;
    // XMLHttpRequest对象：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/XMLHttpRequest

    const request = new XMLHttpRequest();
    stLog.warn("readyState-after new XMLHttpRequest ", request.readyState);

    if (responseType) {
      request.responseType = responseType;
    }

    // 未请求设置超时时间
    if (timeout) {
      request.timeout = timeout;
    }
    if (withCredentials) {
      request.withCredentials = withCredentials;
    }
    request.open(method.toUpperCase(), url!, true);
    stLog.warn("readyState-after open", request.readyState);
    // 设置请求头
    stLog("request.setRequestHeader(key , value)", headers);
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });

    // 服务端成功响应
    request.onreadystatechange = function handleReadyStateChange() {
      stLog.warn("readyState-handleReadyStateChange", request.readyState);
      stLog.info(
        "request.onreadystatechange",
        request,
        ` request.readyState:${request.readyState} ,  request.status:${request.status} `
      );
      // 网络错误和请求超时 status都是0
      if (request.status === 0) {
        console.log(request);
        return;
      }
      // readyState 表示request的状态，4 代表已经完成
      if (request.readyState !== 4) return;
      // 将字符串headers转为对象形式
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      stLog.info("responseHeaders", responseHeaders);

      const responseData =
        responseType !== "text" ? request.response : request.responseText;

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
      stLog.error("request.onerror", e);
      reject(createError("网络异常", config, null, request));
    };

    request.ontimeout = function handleTimeout(e) {
      stLog.error("request.ontimeout", e);
      const error = createError(
        `网络超时，timeout：${timeout}`,
        config,
        null,
        request
      );
      reject(error);
    };

    if (cancelToken) {
      stLog("cancelToken, request.abort", cancelToken);
      cancelToken.promise.then((reason) => {
        request.abort(); //终止网络请求
        reject(reason);
      });
    }
    request.addEventListener("progress", function (e) {
      stLog("request.onProgress", e);
    });

    stLog("request.send", data);
    request.send(data);
    stLog.warn("readyState-after send", request.readyState);
  });
}
