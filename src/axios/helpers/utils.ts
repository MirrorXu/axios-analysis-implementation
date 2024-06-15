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
