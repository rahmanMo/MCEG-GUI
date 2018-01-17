// Target env = MVT Stage 3
// this script auto runs MVT Stage 3 data feed script 'workerSTG3' every 16 second
const pythonShell = require('python-shell');
setInterval(function () {

  pythonShell.run('workerSTG3.py', function (err) {
    if (err) throw err;
    let d = new Date();
    let dateL = d.toLocaleDateString();
    var timeL = d.toLocaleTimeString();
    console.log(`Server adhoc 4 request/response local dateTime: ${dateL} ${timeL}`);
    console.log('finished');
  });

},16000);

