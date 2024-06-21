import Axios from "@/axios/core/Axios";
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "@/axios/types";
import { defaultsRequestConfig } from "@/axios/defaults";
import { extend } from "@/axios/helpers/utils";

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context: Axios = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance as AxiosInstance;
}
const axios = createInstance(defaultsRequestConfig);

export default axios;
