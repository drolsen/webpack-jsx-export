/*
  This process uses pure babel approach to parse 
  JSX files into HTML and then write results to disk.
  Allows for Webpack configuration usage of plugin, or NodeJS usage of plugin
*/

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { parse } = require('node-html-parser');
const ReactDOM = require('react-dom/server');
const pretty = require('pretty');

class WebpackJSXExport {
  constructor(options) {
    this.options = Object.assign({
      files: [],
      plugins: [],
      comment: 'THIS FILE IS AUTO GENERATED BY WebpackJSXExport'
    }, options);   
  }

  // Helper method used to clean up markup results
  clean(markup, rules) {
    Object.keys(rules).map((i) => {
      markup = markup.replace(new RegExp(i, 'g'), rules[i]);
      return false;
    });

    return markup;
  }

  // Helper method that is used procure JSX into Markup and write to disk
  write(example, name, index, path){
    const DOM = parse(
      this.clean(ReactDOM.renderToStaticMarkup(example.default), {
        'data-sly-unwrap=""': 'data-sly-unwrap',
        '&quot;': '"',
        '&#34;': '"',
        '&#x27;': '\'',
        '&amp;': '&',
        '&#39;': '\'',
        '&gt;': '>'
      })
    );

    // Remove any elements flagged to NOT be rendered in production views
    if (DOM.querySelector('[data-sly-exports="false"]')) {
      const nonExportingFragments = DOM.querySelectorAll('[data-sly-exports="false"]');
      let nodeLength = nonExportingFragments.length;
      while (nodeLength--) {
        Object.defineProperty(exportingFragments[nodeLength], 'childNodes', { value: [] });
        Object.defineProperty(exportingFragments[nodeLength], 'tagName', { value: '' });
      }
    }

    if (DOM.querySelector('[data-sly-exports="true"]')) {
      const exportingFragments = DOM.querySelectorAll('[data-sly-exports="true"]');
      let nodeLength = exportingFragments.length;
      while (nodeLength--) {
        Object.defineProperty(exportingFragments[nodeLength], 'tagName', { value: '' });
      }
    }

    fs.writeFile(
      path,
      pretty(
        `
          ${(this.options.comment) ? `<!--/* ${this.options.comment} */-->` : ''}
          ${DOM.toString()}
        `
      ),
      (e) => {
        if (e) {
          return false;
        }
      }
    );
  }

  apply(compiler) {
    const collection = [];

    compiler.hooks.done.tap({ name: 'WebpackJSXExport' }, () => {
      // Registering required dependencies to both parse and import JSX files directly into NodeJS
      // .JSX imports must happen after this register, or else I'll come to your house and break all your spaghetti!
      require("@babel/register")({
        ignore: [],
        presets: ['@babel/preset-env', 
          [
            '@babel/preset-react',
            {
              'development': false
            }
          ]
        ],  
        plugins: [
          [
            require.resolve('babel-plugin-import-globals'), {
              "React": "react",
              "PropTypes": 'prop-types'
            }
          ],
          'babel-plugin-file-loader',
          'babel-plugin-css-modules-transform',
          'babel-plugin-transform-require-context',
          '@babel/plugin-transform-react-jsx',
          '@babel/plugin-proposal-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
          '@babel/plugin-proposal-class-properties', // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
          '@babel/plugin-transform-react-display-name', // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
          '@babel/plugin-proposal-nullish-coalescing-operator', // (see: https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)
          '@babel/plugin-proposal-async-generator-functions', // (see: https://babeljs.io/docs/en/babel-plugin-proposal-async-generator-functions)
          '@babel/plugin-transform-for-of', // (see: https://babeljs.io/docs/en/babel-plugin-transform-for-of)
          '@babel/plugin-proposal-optional-chaining', // (see: https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
          '@babel/plugin-transform-reserved-words'
        ]
      });

      // Because we are using NodeJS and not Webpack, we don't have webpack's powerful import wildcard capabilities so
      // we use glob lib instead to collect all example.jsx files
      Object.keys(this.options.files).map((i) => {
        const { input } = this.options.files[i];
        const { output } = this.options.files[i];
        const { type } = this.options.files[i];

        glob.sync(path.resolve(__dirname, input)).forEach((file) => {

          if (path.basename(file).indexOf('.jsx') !== -1) {
            // Once we have found an example, we import that example file and store its contents in our examples collection.
            collection[file] = {
              input: require(file),
              output,
              type: (type) ? type : '.html'
            };
          }
        });
      });

      // Once we have a full collection, lets loop over it and begin rendering
      // the JSX down to staticMarkup using ReactDOM/Server
      Object.keys(collection).map((i, index) => {
        let { input } = collection[i];
        const { type } = collection[i];
        let { output } = collection[i];

        if (input) {
          output = path.resolve(__dirname, `${output}`);

          if (!fs.existsSync(path.dirname(output))) {
            fs.mkdirSync(path.dirname(output));
          }
          
          this.write(
            input, 
            path.basename(output), 
            index, 
            output.replace(new RegExp(path.parse(output).ext), type)
          );
        }
      });
    });
  }
}

module.exports = WebpackJSXExport;

