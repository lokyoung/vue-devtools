var path = require('path')
var webpack = require('webpack')

var bubleOptions = {
  target: process.env.NODE_ENV === 'production' ? null : { chrome: 52 },
  objectAssign: 'Object.assign'
}

module.exports = {
  entry: {
    hook: './src/hook.js',
    devtools: './src/devtools.js',
    background: './src/background.js',
    'devtools-background': './src/devtools-background.js',
    backend: './src/backend.js',
    proxy: './src/proxy.js',
    detector: './src/detector.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../src'),
      views: path.resolve(__dirname, '../../src/devtools/views'),
      components: path.resolve(__dirname, '../../src/devtools/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:  'buble-loader',
        exclude: /node_modules|vue\/dist|vuex\/dist/,
        options: bubleOptions
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          buble: bubleOptions
        }
      },
      {
        test: /\.(png|woff2)$/,
        loader: 'url-loader?limit=0'
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
