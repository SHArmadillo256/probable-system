// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
          sourceType: "unambiguous",
            presets: ['@babel/preset-env'],
            plugins: [
               ['@babel/plugin-transform-runtime', {
                   corejs: false,
                   helpers: true,
                   regenerator: true,
                   useESModules: false
               }]
             ]
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    static: './dist',
  },
};
