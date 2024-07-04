import { AxiosRequestConfig } from "@/axios/types";
import { isPlainObject } from "@/axios/helpers/utils";
import { deepMerge } from "@/axios/helpers/utils";
import { stLog } from "@/axios/helpers/utils";

function defaultStrat(val1: any, val2: any) {
  return typeof val2 !== "undefined" ? val2 : val1;
}

function fromVal2Strat(val1: any, val2: any) {
  if (typeof val2 !== "undefined") {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== "undefined") {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== "undefined") {
    return val1;
  }
}

// const stratKeysDeepMerge = ["headers"];
// stratKeysDeepMerge.forEach((key) => {
//   strats[key] = deepMerge;
// });
// const stratKeysFromVal2 = ["url", "params", "data"];
// stratKeysFromVal2.forEach((key) => {
//   strats[key] = fromVal2Strat;
// });

// 不同字段的合并策略
let strats = Object.create(null);
strats = {
  headers: deepMergeStrat,
  url: fromVal2Strat,
  params: fromVal2Strat,
  data: fromVal2Strat,
};

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  stLog("mergeConfig", config1, config2);
  if (!config2) config2 = {};

  const config = Object.create(null);

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }

  return config;
}
