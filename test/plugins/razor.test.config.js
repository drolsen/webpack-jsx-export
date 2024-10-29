const WebpackJSXExport = require('../../index.js');
const razor = require('../../plugins/razor.plugin.js');
const path = require('path');

const config = {
  entry: './test/dummy-entry.js',
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
        input: './test/plugins/razor.jsx',
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
