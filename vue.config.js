module.exports = {
    productionSourceMap: false,
    assetsDir: '',
    outputDir: 'meeting',
    baseUrl: './',
    devServer: {
        port: 8081,
        host: '0.0.0.0',
        open: true
    },
    configureWebpack: {
        externals: {
            'AMap': 'AMap',
        },

    },
  


}