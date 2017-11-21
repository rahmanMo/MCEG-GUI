
const pythonShell = require('python-shell');
const fse = require('fs-extra');
const fs = require("fs");
const csvFilePath = './data/data.csv';
const csvToJSON = require('csvtojson');
const csv = require('csv-tools');

// setInterval(function () {


  csv.fileToJSON(csvFilePath, function(json) {
    console.log(JSON.stringify(json));
    fs.writeFile( "./data/data.json", JSON.stringify(json), (error) => {
      if (error){
        console.log(error);
      }
    } );

    //   // With Promises
    // fse.writeJson('./data/data.json', JSON.stringify(json,null,2) )
    // .then(() => {
    //   console.log('success!')
    // })
    // .catch(err => {
    //   console.error(err)
    // });
  });



// },1000);

