
const pythonShell = require('python-shell');
const fse = require('fs-extra');
const fs = require("fs");
// const csvFilePath = './data/data.csv';


setInterval(function () {

  pythonShell.run('worker.py', function (err) {
    if (err) throw err;
    let d = new Date();
    let dateL = d.toLocaleDateString();
    var timeL = d.toLocaleTimeString();
    console.log(`Server adhoc 4 request/response local dateTime: ${dateL} ${timeL}`);
    console.log('finished');
  });


},16000);

