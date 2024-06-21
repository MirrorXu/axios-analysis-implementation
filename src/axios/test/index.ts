import axios, { Axios, AxiosError } from "@/axios/axios";
const Host = "http://localhost:3000";
interface User {
  id?: string;
  name?: string;
}

axios.interceptors.request.use((config) => {
  console.log(config);
  const _token = localStorage.getItem("_token") || "";
  config.headers = {
    _token,
  };
  return config;
});
let _counter = 0;
axios.interceptors.response.use((response) => {
  console.log(response);
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

axios
  .get(`${Host}/user`, {
    params: { id: 1 },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

axios({
  url: `${Host}/user`,
  params: {
    id: 2,
  },
});
