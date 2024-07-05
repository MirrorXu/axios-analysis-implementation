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

export function isFormData(val: any): val is FormData {
  return typeof val !== "undefined" && val instanceof FormData;
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

// interface LogFn {
//   (title: string, args: any[]): void;
// }
// interface ILog extends LogFn {
//   info: LogFn;
//   warn: LogFn;
//   success: LogFn;
//   error: LogFn;
// }
//
// const myLog = {
//   info(title: string, ...args: any[]): void {
//     const textStyle = "color: rgb(0, 0, 255);font-weight:bold; ";
//     console.log(`%c >>> ${title}: `, textStyle, ...args);
//   },
//   warn(title: string, ...args: any[]): void {
//     const textStyle = "color: rgb(255, 255, 0);font-weight:bold; ";
//     console.log(`%c >>> ${title}: `, textStyle, ...args);
//   },
//   success(title: string, ...args: any[]): void {
//     const textStyle = "color: rgb(0, 255, 0);font-weight:bold; ";
//     console.log(`%c >>> ${title}: `, textStyle, ...args);
//   },
//   error(title: string, ...args: any[]): void {
//     const textStyle = "color: rgb(255, 0, 0);font-weight:bold; ";
//     console.log(`%c >>> ${title}: `, textStyle, ...args);
//   },
// };
// function createLog(): ILog {
//   const log = (title: string, ...args: any[]) => {
//     myLog.info(title, ...args);
//   };
//   for (const key in myLog) {
//     log[key] = myLog[key];
//   }
//   return log as ILog;
// }
//
// export const stLog: ILog = createLog();

interface LogFn {
  (title: string, ...args: any[]): void;
}

interface ILog extends LogFn {
  info: LogFn;
  warn: LogFn;
  success: LogFn;
  error: LogFn;
}

const Logs = {
  info(title: string, ...args: any[]): void {
    const textStyle = "color: #03AED2;font-weight:bold;";
    console.log(`%c >>> ${title}: `, textStyle, ...args);
  },
  warn(title: string, ...args: any[]): void {
    const textStyle = "color:#FFA62F;font-weight:bold;";
    console.log(`%c >>> ${title}: `, textStyle, ...args);
  },
  success(title: string, ...args: any[]): void {
    const textStyle = "color:#41B06E;font-weight:bold;";
    console.log(`%c >>> ${title}: `, textStyle, ...args);
  },
  error(title: string, ...args: any[]): void {
    const textStyle = "color:#DD5746;font-weight:bold;";
    console.log(`%c >>> ${title}: `, textStyle, ...args);
  },
};

function createLog(): ILog {
  const log: any = (title: string, ...args: any[]) => {
    Logs.info(title, ...args);
  };

  Object.getOwnPropertyNames(Logs).forEach((key) => {
    log[key] = (Logs as any)[key].bind(Logs);
  });

  return log as ILog;
}

export const stLog = createLog();
