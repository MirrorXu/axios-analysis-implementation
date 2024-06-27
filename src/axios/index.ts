import Axios from "@/axios/core/Axios";
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "@/axios/types";
import { defaultsRequestConfig } from "@/axios/defaults";
import { extend } from "@/axios/helpers/utils";
import mergeConfig from "@/axios/core/mergeConfig";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context: Axios = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  const proto = Object.getPrototypeOf(instance);
  Object.setPrototypeOf(proto, Object.getPrototypeOf(context));
  return instance as AxiosStatic;
}
const axios = createInstance(defaultsRequestConfig);
axios.create = function createAxiosInstance(
  config: AxiosRequestConfig
): AxiosInstance {
  return createInstance(mergeConfig(defaultsRequestConfig, config));
};

export default axios;
