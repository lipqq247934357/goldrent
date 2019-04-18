// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/web': {
<<<<<<< HEAD
                target: 'http://172.16.32.176:8081/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                     // '^/web': ''
=======
                target: 'http://172.16.32.206:8081/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': ''
>>>>>>> 164ba4d893b2030375b8f09557116002f8a73713
                }
            }
        }
    }
}
