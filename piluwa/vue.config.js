const path = require("path")

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
    }
}