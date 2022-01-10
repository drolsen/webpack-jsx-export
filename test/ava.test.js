const test = require('ava');
const fs = require('fs');
const path = require('path');
 
test('basic-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/basic.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('conditions-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/conditions.html'), 'utf8');  

  if (pass.toString().indexOf('<export>') !== -1 || pass.toString().indexOf('<no-export>') !== -1) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('node-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/node.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/custom.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom-extension', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/custom.handlebars'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('htl-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/htl.html'), 'utf8');  

  if (pass.toString().indexOf('data-sly-') === -1) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('razor-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/razor.cshtml'));

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('php-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, '../dist/exported/php.php'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('glob-test', t => {
  const BasicPass = fs.existsSync(path.resolve(__dirname, '../dist/exported/glob/basic.html'));  
  const HTLPass = fs.existsSync(path.resolve(__dirname, '../dist/exported/glob/htl.html'));  

  if (BasicPass && HTLPass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('filter-test', t => {
  let pass = false;

  if (!fs.existsSync(path.resolve(__dirname, '../dist/exported/filter/razor.html'))) {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('extension-filter-test', t => {
  let pass = false;

  if (!fs.existsSync(path.resolve(__dirname, '../dist/exported/filter/razor.cshtml'))) {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});
