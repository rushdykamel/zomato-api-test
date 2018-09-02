const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'app': './app/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/webapp'
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    },
    {
      test: /\.html$/,
      use: ['raw-loader']
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: ['file-loader']
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: 3000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.bundle.css",
    })
  ],
  mode: 'development'
};