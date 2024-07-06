import request, { Host } from "@/axios/test/request";
import { stLog } from "@/axios/helpers/utils";
import qs from "qs";
request
  .get(Host + "/data", {
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

request
  .get(Host + "/data", {
    params: new URLSearchParams("a=1&b=2"),
  })
  .then((res) => {
    stLog("response", res);
  })
  .catch((err) => {
    stLog("catch", err);
  });

request
  .get(Host + "/data", {
    params: {
      a: 1,
      b: 2,
      c: ["a", "b", "c"],
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "brackets" });
    },
  })
  .then((res) => {
    stLog("response", res);
  })
  .catch((err) => {
    stLog("catch", err);
  });
