const WebpackJSXExport = require('../../index.js');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../dummy-entry.js'),
  output: {
    path: path.resolve(__dirname, '../../dist'), 
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  }
};

module.exports = (env, argv) => {
  config.plugins = [
    new WebpackJSXExport({
      files: [{
        input: './test/basic/basic.jsx',
        output: './dist/comment/custom.html'
      }],
      comment: 'This is my custom comment!'
    })
  ];
  return config;
};
