const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackJSXExport = require('../index.js');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/basic'), 
    filename: '../basic/[name].js'
  },
  module: { },
  optimization: {
    minimize: false
  } 
};

module.exports = (env, argv) => {
  config.plugins = [
    new CleanWebpackPlugin(),
    new WebpackJSXExport({
      files: [{
        input: './test/Basic.jsx',
        output: './dist/exported/test.html'
      }],
      plugins: []
    })
  ];
  return config;
};
