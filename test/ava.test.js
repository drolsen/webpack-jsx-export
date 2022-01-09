const test = require('ava');
const fs = require('fs');
const path = require('path');
 
test('basic', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/Basic.html'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('Conditions', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/Conditions.html'), 'utf8');  

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

test('HTL', t => {
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/HTL.html'), 'utf8');  

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
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/Razor.cshtml'), 'utf8');  

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
  const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/PHP.php'), 'utf8');  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('glob', t => {
  const BasicPass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/glob/Basic.html'), 'utf8');  
  const HTLPass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/glob/HTL.html'), 'utf8');  

  if (BasicPass && HTLPass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('filter', t => {
  let pass = false;

  if (!fs.existsSync(path.resolve(__dirname, '../dist/exported/filter/Razor.html'))) {
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

  if (!fs.existsSync(path.resolve(__dirname, '../dist/exported/filter/Razor.cshtml'))) {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

