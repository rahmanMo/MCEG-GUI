const pythonShell = require('python-shell');
const fs = require('fs-extra');

setTimeout(function () {
  // With Promises
  fs.writeJson('./data/data.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })
},15000);

