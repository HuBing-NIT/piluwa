const path = require("path")
const CompressionPlugin = require('compression-webpack-plugin') //gzip 压缩的插件
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; //要进行压缩的文件类型
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false, //关闭eslint
    // 配置路径别名
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src')) //src的绝对路径起一个别名叫@
            .set('api', resolve('./src/api'))
            .set('style', resolve('./src/style'))
            .set('components', resolve('./src/components'))
            .set('icon', resolve('./public/icon'))
            .set('imgs', resolve('./public/imgs'))
            // 配置分析工具
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(BundleAnalyzerPlugin)
                    .end();
            }
        } else {}
    },
    // 配置gzip 
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new CompressionPlugin({
                algorithm: 'gzip',
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8
            }))
        }
    }

}