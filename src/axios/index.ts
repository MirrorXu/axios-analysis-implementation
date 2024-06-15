import Axios from "@/axios/core/Axios";
import { extend } from "@/axios/helpers/utils";
import { AxiosInstance } from "@/axios/types";

function createInstance() {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance;
}
const axios = createInstance();

export default axios;
