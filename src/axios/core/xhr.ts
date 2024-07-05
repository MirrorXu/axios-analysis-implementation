import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "@/axios/types";
import { parseHeaders } from "@/axios/helpers/headers";
import { createError } from "@/axios/helpers/error";
import { isFormData, stLog } from "@/axios/helpers/utils";
import { isSameOrigin } from "@/axios/helpers/url";
import cookie from "@/axios/helpers/cookie";

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
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
    } = config;

    // XMLHttpRequest对象：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/XMLHttpRequest
    // 创建请求对象
    const request = new XMLHttpRequest();
    stLog.warn("readyState-after new XMLHttpRequest ", request.readyState);
    // 初始化请求
    request.open(method.toUpperCase(), url!, true);
    stLog.warn("readyState-after open", request.readyState);
    // 配置请求对象
    configRequest();
    // 绑定事件回调
    addEvents();
    // 处理请求头
    processHeaders();
    // 配置Cancel
    processCancel();
    stLog("request.send", data);
    // 发送请求
    request.send(data);
    stLog.warn("readyState-after send", request.readyState);

    // 配置request
    function configRequest(): void {
      // 设置responseType, 浏览器根据不同的responseType会对响应内容做不同的处理
      if (responseType) {
        request.responseType = responseType;
      }
      // 未请求设置超时时间
      if (timeout) {
        request.timeout = timeout;
      }
      // 配置是否允许跨域cookie
      if (withCredentials) {
        request.withCredentials = withCredentials;
      }
    }
    // 绑定回调事件
    function addEvents(): void {
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
      // 超时
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
      // 上传进度
      if (onUploadProgress) {
        request.upload.onprogress = function handleUploadProgress(e) {
          stLog("request.upload.onprogress", e);
          onUploadProgress.call(request, e);
        };
      }
      // 下载进度
      if (onDownloadProgress) {
        request.onprogress = function handleDownloadProgress(e) {
          stLog("request.onDownloadProgress", e);
          onDownloadProgress.call(request, e);
        };
      }
    }
    // 处理headers
    function processHeaders(): void {
      // xsrf防御功能
      if (
        (withCredentials || isSameOrigin(url!)) &&
        xsrfCookieName &&
        xsrfHeaderName
      ) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }
      // 设置请求头
      stLog("headers", headers);
      Object.keys(headers).forEach((name) => {
        request.setRequestHeader(name, headers[name]);
      });

      if (isFormData(data)) {
        delete headers["Content-Type"];
        delete headers["content-type"];
      }
    }
    // 处理Cancel配置
    function processCancel(): void {
      if (cancelToken) {
        stLog("cancelToken, request.abort", cancelToken);
        cancelToken.promise.then((reason) => {
          request.abort(); //终止网络请求
          reject(reason);
        });
      }
    }
  });
}
