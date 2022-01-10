const WebpackJSXExport = require('../../index.js');

const exporter = new WebpackJSXExport({
  files: [{
    input: './test/basic/basic.jsx',
    output: './dist/node'
  }]
});

exporter.run();
