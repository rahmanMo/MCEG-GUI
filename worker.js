const pythonShell = require('python-shell');
const fs = require('fs-extra');
const csvFilePath='./data/data.csv';
const csvToJSON=require('csvtojson');

setTimeout(function () {


  csvToJSON()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
    // With Promises
      fs.writeJson('./data/data.json', jsonObj )
      .then(() => {
        console.log('success!')
      })
      .catch(err => {
        console.error(err)
      });
  })
  .on('done',(error)=>{
    console.log('end')
  });

},15000);

