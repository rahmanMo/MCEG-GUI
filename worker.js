
const pythonShell = require('python-shell');
const fse = require('fs-extra');
const fs = require("fs");
const csvFilePath = './data/data.csv';


setInterval(function () {

  pythonShell.run('worker.py', function (err) {
    if (err) throw err;
    console.log('finished');
  });


},16000);

