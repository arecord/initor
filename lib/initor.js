/*

initor
https://github.com/arecord/initor

Copyright (c) 2013 clonn, peihsinsu
Licensed under the MIT license.
*/


(function() {
  'use strict';
  var exec = require('child_process').exec
    , _ = require('underscore')
    , request = require('request')
    , nu = require('nodeutil')
    , fs = require('fs')
  var cmds = {
    express: {
      cmd: __dirname + '/../node_modules/express/bin/express',
      avaliable_opts: {
        'e': 'use ejs layout',
        's': 'add session support'
      }
    }
  }

  var snips = {
    mysql: {
      "mysql-config": {
        url: "http://opennodes.arecord.us/examples/mysql/mysql-config.js",
        desc: "mysql config file, for setting the connection"
      }
    }
  }

  exports.awesome = function() {
    return 'awesome';
  };

  exports.genPrj = function(model, opts, prj_name, callback) {
    console.log('model:%s, prj_name:%s', model, prj_name);
    if(!opts) opts = [];
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
        if(callback)
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

  exports.listSnip = function(modulename) {
    return snips[modulename]
  }

  exports.getSnip = function(prjpath, modulename, snipname, callback) {
    var topath = prjpath + '/lib/' + modulename;
    if(!fs.existsSync(prjpath + '/lib/')){
      fs.mkdirSync(prjpath + '/lib/');
    }
    if(!fs.existsSync(topath)){
      fs.mkdirSync(topath);
    }

    if(!snips[modulename] || !snips[modulename][snipname]) {
      return callback({status:400, msg:'snip not found'});
    }
    request.get(snips[modulename][snipname].url, function(e,r,d){
      fs.writeFileSync(topath + '/' + snipname + '.js', d, 'utf8' );
      if(callback) callback({status:200, msg:'ok'});
    });
  }

  /**
   * Add project memory function
   */
  var dbfile = __dirname + '/../db/db.json';
  var db = nu.cfgutil.readJsonCfg(dbfile);
  exports.savePrj = function(prjname, path, status, create_date, callback) {
    console.log('Save or update a project to json file store...');
    if(!db) db = {};
    if(!db[prjname]) db[prjname] = {}
    db[prjname].path = path;
    db[prjname].status = status;
    db[prjname].create_date = create_date;
    fs.writeFileSync(dbfile, JSON.stringify(db), 'utf8');
    if(callback) callback();
  }

  exports.removePrj = function(prjname, callback) {
    console.log('Remove project from db store...');
    delete db[prjname];
    fs.writeFileSync(dbfile, JSON.stringify(db), 'utf8');
    if(callback) callback();
  }

  exports.getExistsPrj = function(name){
    db = nu.cfgutil.readJsonCfg(dbfile);
    if(!db) db = {};
    if(name) 
      return db[name];
    else
      return db;
  }

  exports.resetPrjStatus = function(){
    console.log('Reset stored project status...');
    db = nu.cfgutil.readJsonCfg(dbfile);
    if(db) {
      var key = _.keys(db);
      for(var i = 0 ; i < key.length ; i++) {
        var v = db[key[i]];
        v.status = 'stop';
      }
      fs.writeFileSync(dbfile, JSON.stringify(db), 'utf8');
    } else {
      console.log('db no data found');
    }
  }
}).call(this);


