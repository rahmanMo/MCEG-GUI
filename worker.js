const fs = require('fs');
const moment = require('moment');
const path = require('path');

const stg1Send =
  '//jbvstmpdbs2000/sabre/FLTCTRL/QUEUES/FlightDomain/adh_receive';
const stg1Get = '//jbvstmpdbs2000/sabre/FLTCTRL/QUEUES/FlightDomain/adh_save';
const stg3Send = '//gscfile01/SharedFile/QA_MVC/STG3/adh_receive';
const stg3Get = '//gscfile01/SharedFile/QA_MVC/STG3/adh_send';
const myFolder = '//hqfitsrv01/QAShare/new/Mohammed Adnan/Pictures';
const lastRequestFilePath = null;

console.log('Satge 1 Send exist?', fs.existsSync(stg1Send));
console.log('Stage 1 Get exist?', fs.existsSync(stg1Get));
console.log('Satge 3 Send exist?', fs.existsSync(stg3Send));
console.log('Stage 3 Get exist?', fs.existsSync(stg3Get));
console.log('MyFolder exist?', fs.existsSync(myFolder));

// let today     = moment(new Date()).format('DDMMMYY').toString().toUpperCase();
// let tomorrow  = moment(new Date()).add(1,'days').format('DDMMMYY').toString().toUpperCase();
// let dayAfterTomorrow = moment(new Date()).add(2, 'days').format('DDMMMYY').toString().toUpperCase();

// console.log('Date Today:', today);
// console.log('Date Tomorrow', tomorrow);
// console.log('Date Day After Tomorrow', dayAfterTomorrow);

// Wait for file to exist, checks every 2 seconds
async function getFile(path, timeout) {
  const timeout = setInterval(function() {
    const file = path;
    const fileExists = fs.existsSync(file);

    console.log('Checking for: ', file);
    console.log('Exists: ', fileExists);

    if (fileExists) {
      clearInterval(timeout);
    }
  }, timeout);
}

function sendAdhocAndCopyToMongo() {
  let today = moment(new Date())
    .format('DDMMMYY')
    .toString()
    .toUpperCase();
  let tomorrow = moment(new Date())
    .add(1, 'days')
    .format('DDMMMYY')
    .toString()
    .toUpperCase();
  let dayAfterTomorrow = moment(new Date())
    .add(2, 'days')
    .format('DDMMMYY')
    .toString()
    .toUpperCase();
  let timeStamp = moment(new Date())
    .format('YYYY-MMM-DD_HH-mm-ss')
    .toString()
    .toUpperCase();
  let fileNameToday = `MCEG_ADH004_${timeStamp}`;
  let adhoc4Today = `ADH004_${today}`;

  if (this.lastRequestFilePath == null) {
    fs.appendFile(`${stg3Send}/${fileNameToday}.txt`, adhoc4Today, function(
      err
    ) {
      if (err) throw err;
      console.log('Adhoc 4 Sent');
      console.log('Waiting for reply');

      setTimeout(function() {
        // if file is still sitting on adh_receive folder
        if (fs.existsSync(`${stg3Send}/${fileNameToday}.txt`)) {
          this.lastRequestFilePath = `${stg3Send}/${fileNameToday}.txt`;
          console.log(`Request file still in que, did not process, Adhoc maybe down, filename: ${fileNameToday}.txt`);

          // if file was processed by adhoc processor and not available in adh_receive folder
        } else if (!fs.existsSync(`${stg3Send}/${fileNameToday}.txt`)) {
          // if file is found on adh_send folder
          if (fs.existsSync(`${stg3Get}/${fileNameToday}.csv`)) {

            fs.copyFileSync(
              `${stg3Get}/${fileNameToday}.csv`,
              './data/data.csv'
            );

            // now use python script to add row to data.csv and transfer data to mongodb
            // after mongodb do the following

            // delete the file after use
            fs.unlinkSync(`${stg3Get}/${fileNameToday}.csv`);
            this.lastRequestFilePath = null;
            console.log('Adhoc 4 copied to mongodb successfully');

            // if file was not found in adh_send folder
          } else if (!fs.existsSync(`${stg3Get}/${fileNameToday}.csv`)) {
            this.lastRequestFilePath = `${stg3Get}/${fileNameToday}.csv`;
            let message = `Did not find the csv file in the adh_send folder, Adhoc maybe down, filename expected: ${fileNameToday}.csv`;
            return message;
          }
        }
      }, 20000);
    });
  } else if (!this.lastRequestFilePath == null) {
    let message = `Last request did not process, Adhoc maybe down, expected file path: ${
      this.lastRequestFilePath
    }`;
    return message;
  }
}
// let result = sendAdhocAndCopyToMongo();
// console.log(result);

// run the function 'sendAdhocAndCopyToMongo' in an interval

setInterval(function() {
  let result = sendAdhocAndCopyToMongo();
  console.log(result);
}, 20000);
