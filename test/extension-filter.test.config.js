const WebpackJSXExport = require('../index.js');
const HTL = require('../plugins/htl.plugin.js');
const Razor = require('../plugins/razor.plugin.js');
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
        output: './dist/exported/extension/',
        extension: (file) => {
          if (file.name === 'razor.jsx') { file.extension = '.cshtml' }

          return file;
        }
      }],
      plugins: {
        output: [HTL, Razor]
      }
    })
  ];
  return config;
};
