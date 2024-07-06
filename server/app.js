const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const app = express();
const port = 3000;
// 解析 URL 编码的请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const cors = require("cors");
const myCors = cors({
  origin: true,
  credentials: true,
  // methods: ["GET", "POST", "PUT", "PATCH"],
});
console.log(myCors);
app.use(myCors);
const TokenName = "x-token";
app.post("/login", (req, res) => {
  console.log(chalk.green(`${req.hostname}${req.url}`));

  console.log(chalk.red("req.body:"), req.body);
  console.log(chalk.red("req.cookies:"), JSON.stringify(req.cookies));
  res.cookie(TokenName, "user_1232343");
  const reqBody = req.body;
  const sendData = {
    msg: "success",
    code: 200,
    data: {
      ...reqBody,
    },
  };
  res.send(sendData);
});

app.get("/user", (req, res) => {
  console.log(chalk.green(`${req.hostname}${req.url}`));

  // res.cookie("token", 456);
  const cookies = req.cookies;
  const headers = req.headers;
  console.log(chalk.red("req.headers:"), headers);
  console.log(chalk.red("req.cookies:"), req.cookies);
  if (headers[TokenName]) {
    res.json({ name: "张三", ...req.query });
  } else {
    res.status(400).json({ message: "token无效" });
  }
  // if (headers.accept.includes("text/html; charset=UTF-8")) {
  //   res.type("html");
  //   res.send(` <h1 id="aaa">${JSON.stringify(req.query)}</h1>`);
  // } else if (headers.accept.includes("json")) {
  //   res.type("json");
  //   res.json({ name: "张三", ...req.query });
  // }
});

// app.post("/user", (req, res) => {
//   console.log(req.url);
//   console.log("req:", req.query);
//   res.send({ name: "张三", ...req.query });
// });

app.post("/auth", (req, res) => {
  const { authorization } = req.headers;
  const [a, encodeData] = authorization.split(" ");
  const [username, password] = atob(encodeData).split(":");
  console.log(username, password);
  if (username === "Mirror" && password === "123456") {
    res.send({
      message: "success",
      code: 200,
      data: {
        username,
        password,
      },
    });
  } else {
    res.status(401).json({ message: "未授权" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
