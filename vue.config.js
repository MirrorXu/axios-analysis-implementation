const { defineConfig } = require("@vue/cli-service");
const chalk = require("chalk");
const { red, green, yellow, blue, magenta } = require("chalk");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    console.log(yellow("## config.devtool:"), config.devtool);
    //调试JS
    config.devtool = "source-map";
    console.log(chalk.red("## config.devtool:"), config.devtool);
  },
});
