import request from "./request";
import { stLog } from "@/axios/helpers/utils";
interface User {
  name?: string;
  [propName: string]: any;
}

// 设置cookie
document.cookie = "test=123";
// 发起请求
stLog("request", request);

request
  .post<User>(
    "http://localhost:3000/login",
    // "http://www.baidu.com/login",
    {
      name: "xxx",
      pwd: "yyy",
    },
    {
      withCredentials: true,
      responseType: "text",
      // contentType: "text/plain",
      headers: {
        "content-type": "application/octet-stream",
      },
    }
  )
  .then((res) => {
    stLog("success", res);
    // console.log(Get());
  })
  .catch((err) => {
    stLog("error", err);
  })
  .then(() => {
    return request.get<User>("http://localhost:3000/user", {
      withCredentials: true,
      params: {
        name: "xxx",
        pwd: "yyy",
      },
      responseType: "json",
    });
  })
  .then((res) => {
    stLog.success("success", res);
  })
  .catch((err) => {
    stLog("error", err);
  });
