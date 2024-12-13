const { defineConfig } = require("@vue/cli-service");
const port = process.env.port || process.env.npm_config_port || 80; // 端口
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    historyApiFallback: {
      index: "/index.html",//与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    port: port,
  },
   // webpack-dev-server 相关配置
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      });
      return definitions;
    });
    config.plugin("html").tap((args) => {
      args[0].title = "西安市房产三维可视化管理平台";
      return args;
    });
  },
});
