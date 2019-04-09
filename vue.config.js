// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.105.185.89',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/static/mock'
                }
            }
        }
    }
}
