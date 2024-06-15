import axios, { Axios, AxiosError } from "@/axios/axios";
// axios({
//   url: "https://v2.api-m.com/api/title",
//   params: {
//     url: "https://www.baidu.com",
//   },
// }).then((res) => {
//   console.log(res);
// });

// https://apifoxmock.com/m1/4656727-4307598-default

// axios({
//   // method: "post",
//   method: "get",
//   url: "https://apifoxmock.com/m1/4656727-4307598-default/post/create-user",
//   data: {
//     name: "MirrorXu",
//     pwd: "123456",
//   },
// })
//   .then((res) => {
//     console.log("success:", res.config.url);
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log("error:");
//     console.error(e);
//   });
interface User {
  id?: string;
  name?: string;
}
axios<User>({
  method: "post",
  url: "https://apifoxmock.com/m1/4656727-4307598-default/post/create-user",
  data: {
    name: "MirrorXu",
    pwd: "123456",
  },
  // timeout: 100,
})
  .then((res) => {
    console.log("## 请求成功:");
    console.log(res);
  })
  .catch((e: AxiosError) => {
    console.log("## 请求失败:");
    console.log(e.isAxiosError);
    console.log(e.message);
    console.log(e.config);
    console.log(e.request);
    console.log(e.code);
  });

axios<User>(
  "https://apifoxmock.com/m1/4656727-4307598-default/post/create-user",
  {
    method: "post",
    // url: "https://apifoxmock.com/m1/4656727-4307598-default/post/create-user",
    data: {
      name: "MirrorXu",
      pwd: "123456",
    },
    // timeout: 100,
  }
)
  .then((res) => {
    console.log("## 请求成功:");
    console.log(res);
  })
  .catch((e: AxiosError) => {
    console.log("## 请求失败:");
    console.log(e.isAxiosError);
    console.log(e.message);
    console.log(e.config);
    console.log(e.request);
    console.log(e.code);
  });
