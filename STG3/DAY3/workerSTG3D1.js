// Target env = MVT Stage 3
// this script auto runs MVT Stage 3 data feed script 'workerSTG3' every 16 second
const pythonShell = require('python-shell');
const options = {
  mode: 'text',
  pythonOptions: ['-u'] // get print results in real-time
};
setInterval(function () {

  pythonShell.run('workerSTG3D1.py', options, function (err, results) {
    if (err) throw err;
    let d = new Date();
    let dateL = d.toLocaleDateString();
    var timeL = d.toLocaleTimeString();
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    console.log(`Server adhoc 4 request/response local dateTime: ${dateL} ${timeL}`);
    console.log('finished');
  });

},16000);
