

var os = require('os');

function getIP() {
    var network = os.networkInterfaces();
    try {
        for (var i = 0; i < network.en0.length; i++) {
            var json = network.en0[i];
            if (json.family == 'IPv4') {
                return json.address
            }
        }
    } catch (err) {
        return '127.0.0.1'
    }

}

module.exports = {
    // 项目跟目录-> 往后的目录
    rootPath:'',
    // 打包相对路径的项目 解决样式中资源的路径问题
    publicPath: "../../",
    // 开发环境
    development: {
        host: getIP(),
        // 端口
        port: 9127,
        //api 代理地址
        apiURL: '',
        // eslint
        useEslint: false,
        showEslintErrorsInOverlay: false
    },
    // 生产环境
    production: {
        // 端口
        port: 8181,
        //api 代理地址
        apiURL: '',

    },

    // 源码路由
    originPagePath: 'src/views',
    //打包输出路径 相对于项目根目录
    buildDirPath: '../',
    buildDirName: 'dist'
}
