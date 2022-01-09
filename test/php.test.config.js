const WebpackJSXExport = require('../index.js');
const PHP = require('../plugins/PHP.plugin.js');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'test.js'),
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
        input: './test/PHP.jsx',
        output: './dist/exported/',
        extension: '.php'
      }],
      plugins: {
        output: [PHP]
      }
    })
  ];
  return config;
};
