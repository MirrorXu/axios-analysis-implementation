import axios, { Axios, AxiosError, AxiosTransFormer } from "@/axios/axios";
import { isPlainObject } from "@/axios/helpers/utils";
import qs from "qs";
import { transformRequest } from "@/axios/helpers/data";

const Host = "http://localhost:3000";

interface User {
  id?: string;
  name?: string;
}

axios.interceptors.request.use((config) => {
  // console.log(config);
  const _token = localStorage.getItem("_token") || "";
  if (isPlainObject(config.headers)) {
    Object.assign(config.headers, { _token });
  } else {
    config.headers = { _token };
  }
  return config;
});
let _counter = 0;
axios.interceptors.response.use((response) => {
  // console.log(response);
  response.data._counter = ++_counter;
  return response;
}, undefined);

// axios<User>("http://localhost:3000/login", {
//   method: "post",
//   data: {
//     name: "MirrorXu",
//     pwd: "123456",
//   },
//   // timeout: 100,
// })
//   .then((res) => {
//     console.log("## 请求成功:");
//     console.log(res);
//   })
//   .catch((e: AxiosError) => {
//     console.log("## 请求失败:");
//     console.log(e.isAxiosError);
//     console.log(e.message);
//     console.log(e.config);
//     console.log(e.request);
//     console.log(e.code);
//   });

// 测试一个不存在的接口
// const url = Host + "/login";
// axios
//   .get(url, {
//     params: { id: 12345 },
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//

axios.defaults.headers.common["test-common"] = "by set defaults.headers.common";
// axios
//   .get(`${Host}/user`, {
//     params: { id: 1 },
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios<User>("http://localhost:3000/login", {
//   method: "post",
//   data: {
//     name: "MirrorXu",
//     pwd: "123456",
//   },
//   // timeout: 100,
// })
//   .then((res) => {
//     console.log("## 请求成功:");
//     console.log(res);
//   })
//   .catch((e: AxiosError) => {
//     console.log("## 请求失败:");
//     console.log(e);
//   });
// axios({
//   url: `${Host}/user`,
//   params: {
//     id: 2,
//   },
// });

const instance = axios.create({
  headers: {
    ["test-create"]: Date.now(),
    ["test-common"]: "by axios.create()",
    ["test-common-2"]: 321,
    token: 'by axios.create({token:"xxx"})',
  },
  transformRequest: [
    function (data, headers) {
      data._tag = Date.now();
      return data;
    },
    function (data, headers) {
      if (data) {
        data = qs.stringify(data);
      }
      return data;
    },
    ...(axios.defaults.transformRequest as AxiosTransFormer[]),
  ],
});

instance
  .post<User>(
    "http://localhost:3000/login",
    {
      name: "小明",
      pwd: "123456",
    },
    {
      headers: {
        test: 321,
      },
    }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
