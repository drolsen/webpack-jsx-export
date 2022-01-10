const WebpackJSXExport = require('../index.js');
const htl = require('../plugins/htl.plugin.js');
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
        input: './test/glob/*.jsx',
        output: './dist/extension/',
        extension: (file) => {
          if (file.name === 'razor.jsx') { file.extension = '.cshtml' }

          return file;
        }
      }],
      plugins: {
        output: [htl, razor]
      }
    })
  ];
  return config;
};
