/**
 * Project File Database operator
 */ 
var initor = require('./lib/initor')

// create a project
initor.savePrj('testprj', '/tmp/testprj', 'running', new Date().getTime(), function(){
  console.log('create prj ok...');
});


// list all project
console.log(initor.getExistsPrj());

initor.resetPrjStatus();

// list specify project
console.log(initor.getExistsPrj('testprj'));

// delete a project
initor.removePrj('testprj');
