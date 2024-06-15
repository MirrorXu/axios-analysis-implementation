import { isPlainObject } from "@/axios/helpers/utils";

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach((name) => {
    if (
      name !== normalizedName &&
      name.toUpperCase() !== normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name];
    }
  });
}
export function processHeaders(headers: any, data: any): void {
  normalizeHeaderName(headers, "content-type");

  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=UTF-8"; // 设置默认content-type
    }
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
