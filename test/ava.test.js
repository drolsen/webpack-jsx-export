const test = require('ava');
const fs = require('fs');
const path = require('path');
 
test('basic', t => {
  let pass = false;
  const testData = fs.readFileSync(path.resolve(__dirname, '../dist/basic/main.js'), 'utf8');
  if (testData.toString().indexOf('Invalid SVG Response') !== -1) { // "Invalid SVG Response" can be found in minified/un-minfied source
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});
