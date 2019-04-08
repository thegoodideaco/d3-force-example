// const Config = require('webpack-chain')
const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,

  css: {
    sourceMap: true
  },

  /**
   * @param {import('webpack').Configuration} config
   */
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const CopyWebpackPlugin = require('copy-webpack-plugin')

      config.plugins.push(
        new CopyWebpackPlugin([
          {
            from:   resolve('static'),
            ignore: ['.*'],
            to:     'static'
          }
        ])
      )
    }
  },

  /** @param {import('webpack-chain')} config*/
  chainWebpack: config => {
    config.module.rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    config.devtool('cheap-module-eval-source-map').end()
  },

  runtimeCompiler:       true,
  publicPath:            '',
  outputDir:             'dist',
  assetsDir:             '',
  parallel:              true,
  transpileDependencies: ['d3']
}
