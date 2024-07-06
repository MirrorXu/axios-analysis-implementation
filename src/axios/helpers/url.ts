import {
  isDate,
  isFunction,
  isPlainObject,
  isURLSearchParams,
} from "@/axios/helpers/utils";

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%24/gi, "$")
    .replace(/%3A/gi, ":")
    .replace(/%2F/gi, "/")
    .replace(/%2B/gi, "+")
    .replace(/%40/g, "@")
    .replace(/%2c/gi, ",")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) return url;
  let serializedParams: string; // 序列化后的params
  if (paramsSerializer && isFunction(paramsSerializer)) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];
    Object.keys(params).forEach((key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const value = params[key];
      if (value == null) return;

      let values = [];
      if (Array.isArray(value)) {
        values = value;
        key += "[]";
      } else {
        values = [value];
      }

      values.forEach((value) => {
        if (isDate(value)) {
          value = value.toISOString();
        } else if (isPlainObject(value)) {
          value = JSON.stringify(value);
        }
        const part = `${encode(key)}=${encode(value)}`;
        parts.push(part);
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    const marIndex = url.indexOf("#");
    if (marIndex > -1) {
      url = url.substring(0, marIndex);
    }
    url += (url.indexOf("?") > -1 ? "&" : "?") + serializedParams;
  }

  return url;
}

export function isSameOrigin(requestURL: string): boolean {
  const { protocol, host } = resolveURL(requestURL);
  const { protocol: currentProtocol, host: currentHost } = resolveURL(
    location.href
  );
  return protocol === currentProtocol && host === currentHost;
}
function resolveURL(url: string) {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  const { protocol, host } = a;
  return {
    protocol,
    host,
  };
}
