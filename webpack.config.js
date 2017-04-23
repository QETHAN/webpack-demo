
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDev = "dev";

module.exports = {
  entry: { 
    'hello/hello': './src/hello/index.js',
    'index/index': './src/index/index.js'
  },

  output: {
    publicPath: 'http://localhost:8080/',
    path: path.join(__dirname, "dist"),
    filename: `${ isDev == 'dev' ? '[name][hash]' : '[name][chunkhash:8]'}.js`
    // filename: '[name][chunkhash:8].js'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'] 
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose?$!expose?jQuery'
      },
      {
        test: require.resolve('./src/vendor/jq-plugin-a.js'),
        loader: "imports?$=jquery&jQuery=jquery&this=>window"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&publicPath=/&name=image/[name][hash:8].[ext]',
      },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),

    new HtmlWebpackPlugin({
      title: 'hello page',
      filename: 'hello/index.html',
      template: 'html-withimg-loader!' + path.resolve('./src/hello', 'index.html'),
      chunks: ['hello/hello']
    }),

    new HtmlWebpackPlugin({
      title: 'index page',
      filename: 'index/index.html',
      template: 'html-withimg-loader!' + path.resolve('./src/index', 'index.html'),
      chunks: ['index/index']
    }),

    new ExtractTextPlugin('[name][chunkhash].css')
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    alias: {
      'jq-plugin-a': path.resolve(__dirname, './src/vendor/jq-plugin-a.js')
    }
  }
}