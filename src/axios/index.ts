import Axios from "@/axios/core/Axios";
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
  CancelStatic,
  CancelTokenStatic,
} from "@/axios/types";
import { defaultsRequestConfig } from "@/axios/defaults";
import { extend } from "@/axios/helpers/utils";
import mergeConfig from "@/axios/core/mergeConfig";
import Cancel, { isCancel } from "@/axios/cancel/Cancel";
import CancelToken from "@/axios/cancel/CancelToken";

function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const axios: Axios = new Axios(defaultConfig);
  const instance = Axios.prototype.request.bind(axios);
  extend(instance, axios);
  const proto = Object.getPrototypeOf(instance);
  Object.setPrototypeOf(proto, Axios.prototype);
  return instance as AxiosStatic;
}
const axios = createInstance(defaultsRequestConfig);
axios.create = function createAxiosInstance(
  userConfig: AxiosRequestConfig
): AxiosInstance {
  const config = mergeConfig(defaultsRequestConfig, userConfig);
  return createInstance(config);
};
axios.Cancel = Cancel as CancelStatic;
axios.CancelToken = CancelToken as CancelTokenStatic;
axios.isCancel = isCancel;

export default axios;
