import { isDate, isPlainObject } from "@/axios/helpers/utils";

function encode(val: string): string {
  val = val.replaceAll(" ", ""); //替换空格为空字符
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

export function buildURL(url: string, params?: any): string {
  if (!params || !isPlainObject(params)) return url;
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

  const serializedParams = parts.join("&");
  if (serializedParams) {
    const marIndex = url.indexOf("#");
    if (marIndex > -1) {
      url = url.substring(0, marIndex);
    }
    url += (url.indexOf("?") > -1 ? "&" : "?") + serializedParams;
  }

  return url;
}
