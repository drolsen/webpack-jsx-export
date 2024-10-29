const WebpackJSXExport = require('../../index.js');
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
        input: path.resolve(__dirname, './*.jsx'),
        output: './dist/glob/'
      }]
    })
  ];
  return config;
};
