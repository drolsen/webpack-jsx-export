const WebpackJSXExport = require('../index.js');
const php = require('../plugins/php.plugin.js');
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
        input: './test/php.jsx',
        output: './dist/exported/',
        extension: '.php'
      }],
      plugins: {
        output: [php]
      }
    })
  ];
  return config;
};
