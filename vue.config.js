// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/web': {
<<<<<<< HEAD
                // target: 'http://172.16.32.63:8081/',
                target: 'http://172.16.162.159:8081/', // 测试机
=======
                // target: 'http://172.19.1.179:8081/',
                target: 'http://39.97.172.66/', // 报单专用
>>>>>>> newdemandBranch
                // target: 'http://39.97.191.50', // 仿真
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': ''
                }
            }
        },
        port: 8088
    }
}
