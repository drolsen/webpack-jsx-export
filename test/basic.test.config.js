const WebpackJSXExport = require('../index.js');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: '[name].js'
  },
  module: { },
  optimization: {
    minimize: false
  },
  resolve: {
    alias: { }
  }
};

module.exports = (env, argv) => {
  config.plugins = [
    new WebpackJSXExport({
      files: [{
        input: './test/basic.jsx',
        output: './dist/'
      }]
    })
  ];
  return config;
};
