const test = require('ava');
const fs = require('fs');
const path = require('path');
 
setTimeout(() => {
  console.log('!!!!!!PERFORM JSX EXPORT TESTS!!!!')
  test('basic', t => {
    const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/basic.html'), 'utf8');  

    if (pass) {
      t.pass();
    } else {
      t.fail();
    }
  });

  test('conditions', t => {
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

  test('htl', t => {
    const pass = fs.readFileSync(path.resolve(__dirname, '../dist/exported/htl.html'), 'utf8');  

    if (pass.toString().indexOf('data-sly-') === -1) {
      pass = false;
    }

    if (pass) {
      t.pass();
    } else {
      t.fail();
    }
  });

  test('razor', t => {
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

  test('php', t => {
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

    if (BasicPass.toString() && HTLPass.toString()) {
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
}, 5000);
