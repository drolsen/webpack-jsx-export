const test = require('ava');
const fs = require('fs');
const path = require('path');
 
test('basic', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/basic.html'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('Conditions', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/conditions.html'), 'utf8');  

  if (pass.indexOf('<export>') !== -1 || pass.indexOf('<no-export>') !== -1) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('node', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/node.html'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/custom.html'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom-extension', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/custom.handlebars'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('HTL', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/htl.html'), 'utf8');  

  if (pass.indexOf('data-sly-') === -1) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('Razor', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/razor.cshtml'), 'utf8');  

  if (pass.indexOf('@model ') === -1) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('PHP', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/php.php'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('glob', t => {
  const BasicPass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/glob/basic.html'), 'utf8');  
  const HTLPass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/glob/htl.html'), 'utf8');  

  if (BasicPass && HTLPass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('filter', t => {
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

test('extension-filter', t => {
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

