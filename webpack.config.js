
const path = require('path')

module.exports = {
  entry: { 
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      './src/app.js',
      "./src/global.js", ]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
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
        loader: 'style!css'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6']
  }
}