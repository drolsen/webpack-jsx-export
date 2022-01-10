const WebpackJSXExport = require('../../index.js');
const htl = require('../../plugins/htl.plugin.js');
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
        input: './test/plugins/htl.jsx',
        output: './dist/'
      }],
      plugins: {
        output: [htl]
      }
    })
  ];
  return config;
};
