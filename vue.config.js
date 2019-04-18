// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/web': {
                target: 'http://172.16.32.176:8081/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                     // '^/web': ''
                }
            }
        }
    }
}
