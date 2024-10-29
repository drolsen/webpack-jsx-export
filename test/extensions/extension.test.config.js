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
        input: './test/extensions/basic.jsx',
        output: './dist/custom',
        extension: '.handlebars'
      }]
    })
  ];
  return config;
};
