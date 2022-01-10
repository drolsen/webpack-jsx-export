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
        input: './test/glob/*.jsx',
        output: './dist/exported/filter/',
        filter: (file) => {
          if (file.name.indexOf('razor') !== -1) { return false; }

          return file;
        }
      }]
    })
  ];
  return config;
};
