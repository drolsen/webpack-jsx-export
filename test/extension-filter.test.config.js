const WebpackJSXExport = require('../index.js');
const HTL = require('../plugins/HTL.plugin.js');
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
        input: './test/glob/*.jsx',
        output: './dist/exported/extension/',
        extension: (file) => {
          if (file.name === 'Razor.jsx') { file.extension = '.cshtml' }

          return file;
        }
      }],
      plugins: {
        output: [HTL, Razor]
      }
    })
  ];
  return config;
};
