const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'

      },
      {
          test:/\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
      },
      {
            test: /\.css$/,
            use: [
            'vue-style-loader',
            'css-loader'
            ]
        }
    ]
  },
  plugins:[
      new HtmlWebpackPlugin({
          template:'./src/index.html'
      }),
      new VueLoaderPlugin()
      ]

};