var initor = require('./lib/initor');

initor.genPrj('express', ['-e', '-s'], '/tmp/test2', function(){
  initor.addNpmModule('/tmp/test2', 'nodeutil');
});

