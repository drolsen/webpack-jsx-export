const WebpackJSXExport = require('../index.js');

const exporter = new WebpackJSXExport({
  files: [{
    input: './test/Basic.jsx',
    output: './dist/exported/node'
  }]
});

exporter.run();
