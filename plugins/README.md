## Creating Plugins
Building a output plugin for WebpackJSXExport starts with structure:

```js
const MyPlugin = (options) => {
  return {
    PreParse (document) {

    },
    PostParse (document) {

    }
  };
};

module.exports = MyPlugin;
```

WebpackJSXExport only offers two hooks for plugin authoring:

Hook | Description
--- | --- 
`PreParse` | Hook which returns data before being parsed by Babel, React and DOM parser.
`PostParse` | Hook which returns DOM for traversing / manipulating using DOM parser API. (see below)


### DOM Manipulation API
The returned DOM from a `Parse` hook is a [node-html-parser](https://www.npmjs.com/package/node-html-parser) Object which offers number of methods for DOM and attribute manipulation. These are standard DOM methods you will find in browser, but for NodeJS.

See all available methods that can be used on `Parse` hook's returned DOM: [DOM Methods](https://www.npmjs.com/package/node-html-parser)

### Input vs. Output Plugins

Please note that the above syntax is for making custom `output` plugins.
If you are interested in building your own `input` plugin, you are looking to craft a babel plugin and is recommended you turn to babel API docs on how to do so.

