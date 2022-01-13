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
        input: './test/basic/basic.jsx',
        output: './dist/comment/comment-filtered.html'
      }],
      comment: (file) => {
        if (file.name.indexOf('basic') !== -1) {
          file.comment = 'This is a custom comment for basic.jsx';
        }

        return file;
      }
    })
  ];
  return config;
};
