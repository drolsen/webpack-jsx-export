const test = require('ava');
const fs = require('fs');
const path = require('path');

test('basic-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, './../dist/basic.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('conditions-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/conditions.html'), 'utf8');  

  if (
    pass.toString().indexOf('<export>') !== -1 
    || pass.toString().indexOf('<no-export>') !== -1 
    || pass.toString().indexOf('I should not be exported') !== -1
  ) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('node-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, './../dist/node.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, './../dist/custom.html'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('custom-extension', t => {
  const pass = fs.existsSync(path.resolve(__dirname, './../dist/custom.handlebars'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('htl-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/htl.html'), 'utf8');  

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
  const pass = fs.existsSync(path.resolve(__dirname, './../dist//razor.cshtml'));

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('php-test', t => {
  const pass = fs.existsSync(path.resolve(__dirname, './../dist/php.php'));  

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('glob-test', t => {
  const BasicPass = fs.existsSync(path.resolve(__dirname, './../dist/glob/basic.html'));  
  const HTLPass = fs.existsSync(path.resolve(__dirname, './../dist/glob/htl.html'));  

  if (BasicPass && HTLPass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('filter-test', t => {
  let pass = false;

  if (!fs.existsSync(path.resolve(__dirname, './../dist/filter/razor.html'))) {
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

  if (!fs.existsSync(path.resolve(__dirname, './../dist/filter/razor.cshtml'))) {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('filter-alt-schema-test', t => {
  let pass = true;

  if (!fs.existsSync(path.resolve(__dirname, './../dist/filter/alt-schema.html'))) {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('comment-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/comment/custom.html'), 'utf8');

  if (pass.indexOf('<!--/* This is my custom comment! */-->') === -1) {
    pass = false;
  } else {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('comment-filter-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/comment/comment-filtered.html'), 'utf8');

  if (pass.indexOf('<!--/* This is a custom comment for basic.jsx */-->') === -1) {
    pass = false;
  } else {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('comment-false-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/comment/no-comment.html'), 'utf8');

  if (pass.indexOf('<!--/* ') !== -1) {
    pass = false;
  } else {
    pass = true;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});

test('warnings-test', t => {
  let pass = fs.readFileSync(path.resolve(__dirname, './../dist/warnings/warning.log'), 'utf8');

  if (pass.indexOf('Warning:') === -1) {
    pass = true;
  } else {
    pass = false;
  }

  if (pass) {
    t.pass();
  } else {
    t.fail();
  }
});
