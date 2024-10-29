const WebpackJSXExport = require('../../index.js');
const php = require('../../plugins/php.plugin.js');
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
        input: './test/plugins/php.jsx',
        output: './dist/',
        extension: '.php'
      }],
      plugins: {
        output: [php]
      }
    })
  ];
  return config;
};
