const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
// 解析 URL 编码的请求体
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get("/user", (req, res) => {
  console.log("req:", req.query);
  res.send({ name: "张三", ...req.query });
});
app.post("/login", (req, res) => {
  console.log(chalk.red("### req.body:"), req.body);
  // Object.keys(req.headers).forEach((key) => {
  //   console.log(
  //     chalk.red(key),
  //     chalk.blue(":"),
  //     chalk.yellow(req.headers[key])
  //   );
  // });
  const body = req.body || {};
  res.send({
    msg: "success",
    code: 200,
    data: {
      ...body,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
