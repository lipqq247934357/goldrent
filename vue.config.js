// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/web': {
                // target: 'http://172.16.5.183:8081/',
                target: 'http://172.16.162.159:8081/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': ''
                }
            }
        }
    }
}
