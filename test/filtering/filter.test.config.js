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
        input: './test/filtering/*.jsx',
        output: './dist/filter/',
        filter: (file) => {
          if (file.name.indexOf('alt-schema') !== -1) { return false; }
          if (file.name.indexOf('razor') !== -1) { return false; }

          return file;
        }
      }]
    })
  ];
  return config;
};
