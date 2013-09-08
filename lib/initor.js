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
    , ctl = require('./jobcontroller')
    , cmds = require('./cmds').db
    , snips = require('./snips').db;

  exports.genPrj = function(model, opts, prj_name, callback) {
    console.log('model:%s, prj_name:%s', model, prj_name);
    if(!opts) opts = [];
    opts.push(prj_name);
    opts.push('-f');
    console.log(opts);
    var cmd = cmds[model].cmd;
    cmd = cmd + ' ' + opts.join(' ');
    savePrj(getPrjName(prj_name), prj_name, 'initial', new Date().getTime(), function(){
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
    });
  }

  function getPrjName(path) {
    var _sp = '/';
    if( path.indexOf('/') <= 0 )
      _sp = '\\';
    return path.split(_sp)[path.split(_sp).length-1];
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
    db[prjname].name = prjname;
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

  exports.getExistsPrj = getExistsPrj;
  function getExistsPrj(name){
    init();
    if(!db) db = {};
    if(name) 
      return db[name];
    else
      return db;
  }

  exports.resetPrjStatus = function(){
    console.log('Reset stored project status...');
    init();
    if(db) {
      var key = _.keys(db);
      for(var i = 0 ; i < key.length ; i++) {
        var v = db[key[i]];
        v.status = 'stop';
      }
      saveDB();
      //fs.writeFileSync(dbfile, JSON.stringify(db), 'utf8');
    } else {
      console.log('db no data found');
    }
  }
 
  function init(){
    if(!db) nu.cfgutil.readJsonCfg(dbfile);
  }

  function saveDB(){
    fs.writeFileSync(dbfile, JSON.stringify(db), 'utf8');
  }
     
  function savePrjVo(vo) {
    init();
    db[vo.name] = vo;
    saveDB();
  }
 
  exports.updatePrjStatus = updatePrjStatus;
  function updatePrjStatus(prjname, status){
    var prj = getExistPrj(prjname);
    prj.status = status;
    savePrjVo(prj);
  }

  exports.startProject = startProject;
  function startProject(prjname, callback){
    var prj = getExistPrj(prjname);
    ctl.forever(prj.name, prj.path, 5);
    updatePrjStatus(prjname, 'running');
    if(callback) callback();
  }
  
  exports.stopProject = stopProject;
  function stopProject(prjname, callback){
    var prj = getExistPrj(prjname);
    ctl.stop(prj.name);
    updatePrjStatus(prjname, 'stop');
    if(callback) callback();
  }

  exports.restartProject = function(prjname, callback){
    stopProject(prjname, function(){
      startProject(prjname, callback);
    });
  }
}).call(this);


