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
        input: './test/filtering/basic.jsx',
        output: './dist/filter/template.html',
        filter: (file) => {
          file.source.default = `
            <!DOCTYPE html>
            <html lang="en-US" dir="ltr">
              <head>
                <title>${file.name}</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </head>
              <body>
                ${file.source.default}
              </body>
            </html>
          `;

          return file;
        }
      }]
    })
  ];
  return config;
};
