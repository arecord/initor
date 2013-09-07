/*

initor
https://github.com/arecord/initor

Copyright (c) 2013 clonn, peihsinsu
Licensed under the MIT license.
*/


(function() {
  'use strict';
  var exec = require('child_process').exec;
  var cmds = {
    express: {
      cmd: __dirname + '/../node_modules/express/bin/express'
    }
  }

  exports.awesome = function() {
    return 'awesome';
  };
  
  exports.genPrj = function(model, opts, prj_name, callback) {
    console.log('model:%s, prj_name:%s', model, prj_name);
    opts.push(prj_name);
    opts.push('-f');
    console.log(opts);
    var cmd = cmds[model].cmd;
    cmd = cmd + ' ' + opts.join(' ');
    exec(cmd, function(err, stdo, stde){
      if(err) console.log(err);
      console.log(stdo);
      exec('cd ' + prj_name + ' && npm install', function(err, stdo, stde) {
        console.log('Solve npm module dependencies...');
        if(err) console.log(err);
        console.log(stdo);
        callback();
      });
    });
  }

  exports.addNpmModule = function(targetPath, moduleName) {
    console.log('Start to install module:%s for %s', moduleName, targetPath);
    exec('cd ' + targetPath + ' && npm install ' + moduleName + ' --save',
      function(err, stdo, stde) {
        if(err) console.log(err);
        console.log(stdo);
      });
  }

}).call(this);
