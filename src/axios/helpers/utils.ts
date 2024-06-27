import { AxiosRequestConfig } from "@/axios/types";
import any = jasmine.any;

const _toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return _toString.call(val) === "[object Date]";
}

export function isObject(val: any): boolean {
  return typeof val !== null && typeof val === "object";
}

// 纯对象
export function isPlainObject(val: any): val is object {
  return _toString.call(val) === "[object Object]";
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const k in from) {
    (to as T & U)[k] = from[k] as any;
  }
  return to as T & U;
}
// export function extend(to: object, from: object) {
//   Object.setPrototypeOf(to, from); // 会修改 to的原型链，不太好
//   return to;
// }

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}

interface LogInfo {
  title?: string;
  [key: string]: any;
}

export default function stLog(...args: any[]): void {
  const info: LogInfo = Object.create(null);

  if (args && typeof args[0] === "string") {
    info.title = args[0];
    console.log(`### ${info.title}:`, ...[...args.slice(1)]);
  } else {
    console.log(...args);
  }
}
