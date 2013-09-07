var ctl = require('./lib/jobcontroller')
  , spawn = require('child_process').spawn;
var app = '/Users/simonsu/project/arecordws/initor/app.js';

//Sample of start job use forever
ctl.forever('test', app, 5);

//Sample of restart job
setTimeout(function(){
  ctl.restart('test');
}, 2000);

//Sample of stop job
setTimeout(function(){
  ctl.stop('test');
}, 5000);
