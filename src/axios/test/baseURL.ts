import request from "@/axios/test/request";
import { stLog } from "@/axios/helpers/utils";

request
  .get("/data", {
    params: {
      a: 1,
      b: 2,
      c: ["a", "b", "c"],
    },
  })
  .then((res) => {
    stLog("response", res);
  })
  .catch((err) => {
    stLog("catch", err);
  });
