// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.16.5.170:8080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
