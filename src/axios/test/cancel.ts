import request from "./request";
import axios from "../index";
import { stLog } from "@/axios/helpers/utils";
const CancelToken = axios.CancelToken;

interface User {
  name?: string;
  [propName: string]: any;
}

// demo 1
// const source = CancelToken.source();
// console.log(source);
// const a = request
//   .post<User>(
//     "http://localhost:3000/login",
//     {
//       name: "小明",
//       pwd: "123456",
//     },
//     {
//       cancelToken: source.token,
//       timeout: 1,
//     }
//   )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     if (axios.isCancel(err)) {
//       stLog("cancel：", err);
//     } else {
//       console.log(err);
//     }
//   });
//
// setTimeout(() => {
//   source.cancel("终止请求");
// }, 1000);

// demo 2

// let cancel!: Canceler;
// request
//   .post<User>(
//     "http://localhost:3000/login",
//     {
//       name: "小王",
//       pwd: "xxxxxx",
//     },
//     {
//       cancelToken: new CancelToken(function executor(c) {
//         cancel = c;
//       }),
//     }
//   )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     if (axios.isCancel(err)) {
//       stLog("cancel：", err);
//     } else {
//       console.log(err);
//     }
//   });
//
// setTimeout(() => {
//   cancel("取消请求xxnfanfkans");
// });

// demo 3
const source = CancelToken.source();
request
  .post<User>(
    "http://localhost:3000/login",
    {
      name: "小王",
      pwd: "xxxxxx",
    },
    {
      cancelToken: source.token,
    }
  )
  .then((res) => {
    stLog.success("first request success：", res);
  })
  .catch((err) => {
    if (axios.isCancel(err)) {
      stLog.error("cancel1：", err);
    } else {
      stLog.error("first request error：", err);
    }
  });

setTimeout(() => {
  source.cancel("手动取消request1请求");

  request
    .post<User>(
      "http://localhost:3000/login",
      {
        name: "xxx",
        pwd: "yyy",
      },
      {
        cancelToken: source.token,
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        stLog.error("request2 canceled ：", err);
      } else {
        console.log(err);
      }
    });
}, 1000);
