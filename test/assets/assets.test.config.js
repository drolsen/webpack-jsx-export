const WebpackJSXExport = require('../../index.js');
const path = require('path');

const config = {
  entry: './test/dummy-entry.js',
  output: {
    path: path.resolve(__dirname, '../../dist'), 
    filename: '[name]-a.js',
    clean: false
  },
  optimization: {
    minimize: false
  }
};

module.exports = (env, argv) => {
  config.plugins = [
    new WebpackJSXExport({
      files: [{
        input: './test/assets/assets-a.jsx',
        output: './dist/'
      }],
      assets: {
        public: '/assets/img',
        output: './../../dist/assets',
        name: '[name].[ext]',
      }
    }),
    new WebpackJSXExport({
      files: [{
        input: './test/assets/assets-b.jsx',
        output: './dist/'
      }], 
      assets: {
        output: './../../dist/assets'
      }
    })    
  ];
 
  return config;
};
