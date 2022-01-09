<div align="center">
  <img src="/assets/logo.jpg" width="700" />
  <p style="margin-top: 25px;">Plugin to allow for the static rendering and exporting of JSX files to disk.</p>

[![Build Status](https://travis-ci.com/drolsen/webpack-jsx-export.svg?branch=master)](https://travis-ci.com/drolsen/webpack-jsx-export)
[![dependencies Status](https://david-dm.org/drolsen/webpack-jsx-export/status.svg)](https://david-dm.org/drolsen/webpack-jsx-export)
[![devDependencies Status](https://david-dm.org/drolsen/webpack-jsx-export/dev-status.svg)](https://david-dm.org/drolsen/webpack-jsx-export?type=dev)
</div>

### Why?
Some larger eco-systems like content management systems don't have the option or desire to render JSX (client or server side) due to the sheer number of libraries already in use. In these instances a export approach allows your project to still use React, but now pre-render and export JSX to larger eco-systems as needed.

### How it works
Webpack JSX Exports takes all incoming JSX files (of a given plugin configuration), then at the end of a standard Webpack build the exporter will process these configured files and write them to disk.

The process for both gathering is done using a glob methods devoid of webpack file gathering. This ensures that plugin configurations can still export files that might not be part of the overall webpack build.

Further more the exporting method uses a babel register approach to reduce the amount of AST parsing and traversing but also allow for export to work devoid of webpack all together in a node script.

It's that simple!

---
### Install
```
npm i --save-dev webpack-jsx-export
```
```
yarn add --dev webpack-jsx-export
```

### Webpack Config
Import `webpack-jsx-export` into your Webpack configuration file:

```js
const WebpackJSXExport = require('webpack-jsx-export');
```

Instantiate new `WebpackJSXExport(...)` class within Webpack's plugin configuration array:
```js
module.exports = {
  "plugins": [
    new WebpackJSXExport()
  ]
};
```

---

## Options

```js
module.exports = {
  "plugins": [
    new WebpackJSXExport({
      ...options...
    })
  ]
};
```

Option | Types | Description | Default
--- | --- | --- | ---
`files` | Object Array | Defines both input and output paths of JSX and exported file(s) | -- 
`files.input` | String | Input location of individual or glob .JSX file(s) | -- 
`files.out` | String | Output location of exported JSX files | -- 
`files.extension` | String or Function | Defines exported file(s) extension type | .html
`files.filter` | Function | Filters away imported .JSX files that you wish NOT to be exported | --
`plugins` | Array | Defines custom plugins used during the processing of each exported JSX file | --
`comment` | String or Boolean | Defines a custom comment, or no comment at all pre-pended to the top of exported files | --

## options.files
With the `files` option, you must specify both `input` and `output` for source JSX files and location where exports will be written:

```js
new WebpackJSXExport({
  files: [{
    input: './input/location/*.jsx',
    output: './export/location/'
  }]
})
```

Multiple locations for input, single export location is the same:
```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/*.jsx',
    output: './export/location/'
  }, {
    input: './input/location-two/*.jsx',
    output: './export/location/'
  }]
})
```

If you only need to target a single JSX file for input you can do so:
```js
new WebpackJSXExport({
  files: [{
    input: './input/location/specific.jsx',
    output: './export/location/'
  }]
})
```

By default the exported filename will be equal to the input JSX filename, however if you want to have a custom name for your exported file, you can specify it in the output path:

```js
new WebpackJSXExport({
  files: [{
    input: './input/location/specific.jsx',
    output: './export/location/custom-name'
  }]
})
```

Please note that there is NO trailing slash or file extension, which tells WebpackJSXExport that this is both a filename (not folder name) and to primes us to default `.html` file extension type on exports.

By default the exported file extension is `.html`; however if you wish to change that, simply use the `extension` option to define a custom one:

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/specific.jsx',
    output: './export/location/custom-name',
    extension: '.php'
  }]
})
```

Or, if you want need different extension types across glob input, use the extension option as filtering method:

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/*.jsx',
    output: './export/location/custom-name',
    extension: (file) => {
      if (file.name === 'Razor.jsx') { file.extension = '.cshtml' }

      return file;
    }
  }]
})
```
Please note you must return `file` to send changes off to export process.

Lastly `files` options offers a `filter` method that allows you to filter away .JSX files you wish NOT to be exported under a glob input scenario:

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/*.jsx',
    output: './export/location/custom-name',
    filter: (file) => {
      if (file.name.indexOf('special-file')) {
        return false;
      }

      return file;
    }
  }]
})
```
Please note, the returning of a `false` value is what denotes a particular file not to be exported; so a `return file` is a required.

## options.plugins
There are two plugin types, `input` and `output`. The `input` plugin types are plugins that support the consuming (pre-rendering) of your JSX files, while the `output` are plugins that support exporting (post-rendering) of your JSX files.

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/*.jsx',
    output: './export/location/'
  }],  
  plugins: {
    input: [],
    output: []
  }
})
```

## options.plugins.input
The `plugins.input` option allows you to specify additional plugins to support the processing of JSX syntax before being rendered for export. This is useful if your JSX uses a newer syntax that requires a babel plugin(s).

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/',
    output: './export/location/'
  }],  
  plugins: {
    input: [
      '@babel/implicit-function'
    ]
  }
})
```

## options.plugins.output
This option allows you to specify additional plugins to process the exported JSX static rendering(s). This is useful if your JSX uses server-side syntax like Adobe HTL, .Net razor or PHP that needs to be custom processed before written to disk. 

```js
new WebpackJSXExport({
  files: [{
    input: './input/location-one/',
    output: './export/location/'
  }],  
  plugins: {
    output: [
      HTLPlugin(),
      RazorPlugin(),
      PHPPlugin()
    ]
  } 
})
```

Please note there is currently no large community behind export plugins, so each plugin (if not found in /plugins/) you will need to craft yourself for your project's exporting needs. For more information on plugin crafting and available API see `/plugins/README.md`.


## options.comment
At the top of each exported file, a comment is included to denote to developers at a later point that this file was auto generated. You can supply your own comment here using the `comment` option.

```js
new WebpackJSXExport({
  comment: 'Please do not edit this file! This was generated at build!'
})
```

Or, if you wish to have no comment (not recommended), simply supply a `false` value:

```js
new WebpackJSXExport({
  comment: false
})
```

### NodeJS Script Usage
```js
const WebpackJSXExport = require('../index.js');

const exporter = new WebpackJSXExport({
  files: [{
    input: './input/location/*.jsx',
    output: './export/location/'
  }]
});

exporter.run();
```

Take note that we have required the `webpack-jsx-export` as `.node` indicating we want a NodeJS version of the plugin. Also note that we now have a `.run()` method to actual perform the exporting. This gives finer control between when instantiating a exporter, its configuration and when the exporting runs.


---

### Babel Transpile Plugins

Webpack JSX Export uses babel plugin register approach to transpile JSX source (and syntax sugar) into markup across both Webpack builds, or NodeJS scripts. The baseline babel transpile plugins used by WebpackJSXExport are the following:

Plugin | Description | URL
--- | --- | --- | ---
`babel-plugin-file-loader` | File loader | [Plugin Details](https://www.npmjs.com/package/babel-plugin-file-loader)
`babel-plugin-css-modules-transform` | Inline Style & Block Style | [Plugin Details](https://www.npmjs.com/package/babel-plugin-css-modules-transform)
`babel-plugin-transform-require-context` | Require importing | [Plugin Details](https://www.npmjs.com/package/babel-plugin-transform-require-context) 
`@babel/plugin-transform-react-jsx` | JSX Transpile | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
`@babel/plugin-proposal-object-rest-spread` | Object Spread | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
`@babel/plugin-proposal-class-properties` | JS Classes | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
`@babel/plugin-transform-react-display-name` | React Helper | [Plugin Details](https://www.npmjs.com/package/babel-plugin-add-react-displayname)
`@babel/plugin-proposal-nullish-coalescing-operator` | JS Syntax Feature | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)
`@babel/plugin-proposal-async-generator-functions` | JS Syntax Feature | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-proposal-async-generator-functions)
`@babel/plugin-transform-for-of` | JS Syntax Feature | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-transform-for-of)
`@babel/plugin-proposal-optional-chaining` | JS Syntax Feature | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
`@babel/plugin-transform-reserved-words` | JS Syntax Feature | [Plugin Details](https://babeljs.io/docs/en/babel-plugin-transform-reserved-words)


### Babel Alias and Global Namespaces
Webpack JSX Export while run under a Webpack configuration will automatically carry over any alias pathing you may have configured for you build. You wont need to maintain this yourself in the plugins option.

```js
require.resolve('babel-plugin-module-resolver'), {  // (see: https://www.npmjs.com/package/babel-plugin-module-resolver)
  'alias': (compiler) ? compiler.options.resovle : {}
}
```

Furthermore two very common global namespaces for `React` and `PropType` have been setup for you, so again you don't need to maintain these in the plugin's options.
```js
require.resolve('babel-plugin-import-globals'), {   // (see: https://www.npmjs.com/package/babel-plugin-import-globals)
  "React": "react",
  "PropTypes": 'prop-types'
}
```

While both of the above come out of the box, take note on how they are being used as you can pass your own versions through the plugin's options if you say, want to add more required global namespaces or context resolver(s).

---

### Tests

Webpack JSX Export comes with a number of tests found under `/tests`.
These are here to help you better understand the expectations of each option we covered above.

Simply run `npm run test` or `yarn test` from the root of the plugin to run all tests. Running a test will produce a `/dist/[test]` directories.

If you would like to change a test, update the root package.json file's `test` script to use any of the `/test/*.test.config.js` files.
