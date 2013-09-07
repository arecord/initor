var ctl = require('./lib/jobcontroller')
  , spawn = require('child_process').spawn;
var app = '/Users/simonsu/project/arecordws/initor/app.js';

ctl.forever('test', app, 5);
