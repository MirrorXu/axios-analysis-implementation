import request, { Host } from "@/axios/test/request";
import { stLog } from "@/axios/helpers/utils";

request
  .post(
    Host + "/noneExits",
    {},
    {
      validateStatus(status) {
        return status >= 200 && status < 500;
      },
    }
  )
  .then((res) => {
    stLog("response", res.status, res);
  })
  .catch((err) => {
    stLog("error", err);
  });
