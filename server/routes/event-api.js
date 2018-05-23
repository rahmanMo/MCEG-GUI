const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs-extra');
const v = require('voca');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// each events ////////////////////////////////////////

//////////////////////// departure gate change (OUT) ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "outUTC":"1245"
}

conditions: if flight  already has any of of these: OFF, ON, IN tell user to to use RMA or RMD (remove arrival remove departure)


*/
router.post('/out', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let outUTC = v.trim(body.outUTC);
  if (!stg == 'stg1' || !stg == 'stg2' || !stg == 'stg3') {
    res.status(400).json({ error: 'stg must be stg1 or stg3' });
  } else if (
    !day == 'd0' ||
    !day == 'd1' ||
    !day == 'd2' ||
    !day == 'd3' ||
    !day == 'd4' ||
    !day == 'd5' ||
    !day == 'd6' ||
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(outUTC) >= 1 && !v.count(outUTC) <= 4 && isNaN(outUTC)) {
    res.status(400).json({ error: 'outUTC must be number minimum 1 and maximum 4 digit' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had airturnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (!v.trim(flightData[0].OFFudt) == '' || !v.trim(flightData[0].ONudt) == '' || !v.trim(flightData[0].INudt) == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} already has OFF or ON or IN. Please use RMA (remove arrival) or RMD (remove departure) before setting new OUT`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let out = v(outUTC).padLeft(4, '0');
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let fileName = `mceg_adhoc16_out_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}OUT${out}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - OUT for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - OUT sent for flight ${pFlightNum} departing utc ${date} with new OUT: ${out}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});




module.exports = router;
