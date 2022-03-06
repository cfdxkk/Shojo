// const proxy = require('http-proxy-middleware');
//服务器会将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000上
module.exports = {
    devServer: {
        //代理axios
        // proxy: 'http://localhost:9000',
        //vue自己启动的端口
        port:1602
    }
}