const WebpackJSXExport = require('../index.js');
const Conditions = require('../plugins/Conditions.plugin.js');
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
        input: './test/Conditions.jsx',
        output: './dist/exported/'
      }],
      plugins: {
        output: [Conditions]
      }
    })
  ];
  return config;
};
