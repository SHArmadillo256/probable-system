// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
    publicPath: '/',
    libraryTarget: 'umd', // Universal Module Definition for broad compatibility
    globalObject: 'this' // Ensuring compatibility with both browsers and Node.js environments
  },
  module: {
    rules: [
      {
        test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
          options: {
            presets: [
             ['@babel/preset-env', [
               targets: "defaults",
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false // Changed from 'commonjs' to false to use native ES Modules
              }]
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: true
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
    target: ['web', 'es5']  // Make sure webpack knows this is for browser environment
};
