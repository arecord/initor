var initor = require('./lib/initor');

// generate project
initor.genPrj('express', ['-e', '-s'], '/tmp/test2', function(){
  // add module
  initor.addNpmModule('/tmp/test2', 'nodeutil');
  // add snip
  initor.getSnip('/tmp/test2', 'mysql', 'mysql-config', function(){
    console.log('add snip done...');
  });
});

