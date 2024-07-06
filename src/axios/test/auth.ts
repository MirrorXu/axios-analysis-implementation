import request, { Host } from "./request";
request.post(
  Host + "/auth",
  {
    a: "a",
    b: "b",
  },
  {
    auth: {
      username: "Mirror",
      // password: "123456",
      password: "1234567",
    },
  }
);
