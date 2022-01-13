const WebpackJSXExport = require('../../index.js');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../dummy-entry.js'),
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
        input: './test/filtering/alt-schema.jsx',
        output: './dist/filter/',
        filter: (file) => {
          let source = file.source.default;
          if (source.custom.location.source) {
            file.source.default = [source.custom.location.source];
          }
          return file;
        }
      }]
    })
  ];
  return config;
};
