const WebpackJSXExport = require('../index.js');
const HTL = require('../plugins/HTL.plugin.js');
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
        input: './test/HTL.jsx',
        output: './dist/exported/'
      }],
      plugins: {
        output: [HTL]
      }
    })
  ];
  return config;
};
