const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 7070,
    // 配置跨域
    proxy: {
      "/api": {
        target: "http://localhost:8080",//需代理的后端接口
        secure: false,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",//重写匹配的字段。把/api 转为 /
        }
      }
    }
    }
})
