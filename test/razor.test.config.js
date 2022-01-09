const WebpackJSXExport = require('../index.js');
const Razor = require('../plugins/Razor.plugin.js');
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
        input: './test/Razor.jsx',
        output: './dist/exported/',
        extension: '.cshtml'
      }],
      plugins: {
        output: [Razor]
      }
    })
  ];
  return config;
};
