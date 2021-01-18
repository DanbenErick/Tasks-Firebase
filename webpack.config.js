const path = require('path');
module.exports = {
  // mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  // watch: true,
  devServer: {
    port: 3000,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  }
};