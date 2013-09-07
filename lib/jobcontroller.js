var spawn = require('child_process').spawn
  , nu = require('nodeutil')
  , L = nu.logger.getInstance('spawn')
  , jobs = {}
  , _start_interval = 15000;

/**
 * Start process 
 * @{name} specify the process name, the unique id of process
 * @{apppath} js file path
 * @{isforever} true for forever start, vice versa
 * @{max} the max retry times
 */
exports.start = start;
function start(name, apppath, isforever, max) {
  var log = nu.logger.getInstance(name)
  var err = [];
  log.info('Starting server....%s', name );
  var server  = spawn('node', [apppath]);
  //var server  = spawn('node', [apppath], {detached: true});

  server.on('data', function(data){
    log.info(data + '');
  });

  server.on('close', function (code, signal) {
    //If start server error, drop process
    if(err && err.length > 0) {
      //jobs[name].stop = true;
      //jobs[name].restart = max;
      log.error(err.join('\n'));
      //stop(name);
    }
    if(isforever && jobs[name] && jobs[name].restart >= max) {
      log.fatal(
        'Restart server[%s] over max (%s times), will drop this job...', 
        name, max);
    }
    if(isforever && jobs[name] && jobs[name].stop != true && jobs[name].restart < max) {
      log.warn('Going to start server:%s', name);
      setTimeout(function(){
        // add restart times flag
        jobs[name].restart++;
        // overwrite the firsttime flag
        if(!jobs[name].first) 
          jobs[name].first = jobs[name].start;
        // interval restart times
        if(new Date().getTime() - jobs[name].first >= _start_interval) 
          jobs[name].restart = 0;
        // do start again...
        start(name, apppath, isforever, max);
      }, 1000);
    }
    log.warn('child process terminated due to receipt of signal '+signal);
    //log.info(jobs);
  });

  server.stdout.on('data', function(data){
    log.info(data.toString()); 
  });

  server.stderr.on('data', function(data){
    //log.error(data.toString()); 
    err.push(data + '');
  });
  //server.unref();
  if(!jobs[name]) {
    jobs[name] = {path: apppath, restart:0, first: new Date().getTime(), max:max};
  }

  jobs[name].server = server;
  jobs[name].start = new Date().getTime();
  
  return jobs[name];
}

exports.forever = forever;
function forever(name, apppath, max) {
  start(name, apppath, true, max);
}

exports.restart = restart;
function restart(name) {
  L.warn('Restart job:%s', name);
  jobs[name].server.kill('SIGHUP');
}

exports.stop = stop;
function stop(name) {
  L.warn('Stoping job:%s', name);
  if(jobs[name]) {
    jobs[name].stop = true;
    jobs[name].server.kill('SIGHUP');
  }
}

//var app = '/Users/simonsu/project/arecordws/initor/app.js';
//forever('test', app, 5);

//setTimeout(function(){
//  stop('test');
//}, 5000);
