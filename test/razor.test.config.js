const WebpackJSXExport = require('../index.js');
const razor = require('../plugins/razor.plugin.js');
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
        input: './test/razor.jsx',
        output: './dist/',
        extension: '.cshtml'
      }],
      plugins: {
        output: [razor]
      }
    })
  ];
  return config;
};
