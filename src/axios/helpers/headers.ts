import { deepMerge, isPlainObject } from "@/axios/helpers/utils";
import { Method } from "@/axios/types";
import any = jasmine.any;

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach((name) => {
    if (
      name.toUpperCase() === normalizedName.toUpperCase() &&
      name !== normalizedName
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}

export function processHeaders(headers: any, data: any): void {
  // 将headers中的 content-type 字段标准化
  normalizeHeaderName(headers, "content-type");
  // 如果用户传递了config.data，则headers["content-type"]设置为"application/json;charset=UTF-8";
  if (isPlainObject(data)) {
    headers["content-type"] = "application/json;charset=UTF-8";
  }
}

export function parseHeaders(headersStr: string): object {
  const parsed = Object.create(null);

  if (!headersStr) return parsed;

  headersStr.split("\r\n").forEach((line) => {
    let [headerKey, value] = line.split(":");
    headerKey = headerKey.trim().toLowerCase();
    if (!headerKey) return parsed;
    if (value) {
      value = value.trim();
    }
    parsed[headerKey] = value;
  });

  return parsed;
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers;
  headers = deepMerge(headers.common, headers[method], headers);
  const methodsToDelete = [
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch",
    "common",
  ];
  methodsToDelete.forEach((method) => {
    delete headers[method];
  });
  return headers;
}
