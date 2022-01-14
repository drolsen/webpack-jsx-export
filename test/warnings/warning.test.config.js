const path = require('path');
const fs = require('fs');
const util = require('util');

if (!fs.existsSync(path.resolve(__dirname, '../../dist/warnings/'))) {
  fs.mkdirSync(path.resolve(__dirname, '../../dist/warnings/'),  { recursive: true });
}

if (!fs.existsSync(path.resolve(__dirname, '../../dist/warnings/debug.log'))) {
  fs.writeFile(
    path.resolve(__dirname, '../../dist/warnings/warning.log'), 
    '',
    (e) => {
      if (e) {
        console.error(e);
        return false;
      }
    }
  );
}

const log_file = fs.createWriteStream(path.resolve(__dirname, '../../dist/warnings/warning.log'), {flags : 'w'});
const log_stdout = process.stdout;

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackJSXExport = require('../../index.js');

console.error = (d) => {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

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
        input: './test/warnings/warning.jsx',
        output: './dist/warnings/'
      }],
      warnings: false
    })
  ];
  return config;
};
