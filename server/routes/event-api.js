const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs-extra');
const v = require('voca');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// each events ////////////////////////////////////////

//////////////////////// OUT ////////////////////////////
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
    !day == 'd7'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (!v.count(outUTC) >= 1 && !v.count(outUTC) <= 4 && isNaN(outUTC)) {
    res.status(400).json({ error: 'outUTC must be number minimum 1 and maximum 4 digit.' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had air turnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (!v(flightData[0].OFFudt).trim() == '' || !v(flightData[0].ONudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} already has OFF or ON or IN. Please use RMA (remove arrival) or RMD (remove departure) before setting new OUT`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let out = v(outUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
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

////////////////////////  OFF  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "offUTC":"1245"
}

conditions: Flight must have OUT time. If flight  already has any of of these: ON, IN tell user to to use RMA (remove arrival)


*/
router.post('/off', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let offUTC = v.trim(body.offUTC);
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
    !day == 'd7'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (!v.count(offUTC) >= 1 && !v.count(offUTC) <= 4 && isNaN(offUTC)) {
    res.status(400).json({ error: 'offUTC must be number minimum 1 and maximum 4 digit.' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had air turnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (v(flightData[0].OUTudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} has no OUT time. Please send OUT event first.`});
      } else if (!v(flightData[0].ONudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} already has ON or IN. Please use RMA (remove arrival) before setting new OFF`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let out = v(flightData[0].OUTudt).trim().padLeft(4, '0');
        let off = v(offUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_off_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}OFF${out}${off}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - OFF for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - OFF sent for flight ${pFlightNum} departing utc ${date} with new OFF: ${off}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


//////////////////////// ON ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "onUTC":"1245"
}

conditions: Flight must have OUT and OFF value. If flight  already has IN value tell user to to use RMA (remove arrival)


*/
router.post('/on', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let onUTC = v.trim(body.onUTC);
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
    !day == 'd7'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (!v.count(onUTC) >= 1 && !v.count(onUTC) <= 4 && isNaN(onUTC)) {
    res.status(400).json({ error: 'onUTC must be number minimum 1 and maximum 4 digit.' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had air turnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (v(flightData[0].OUTudt).trim() == '' || v(flightData[0].OFFudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} needs to have both OUT and OFF first. IN must be empty. Please use RMA (remove arrival) to remove IN before sending ON value`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let on = v(onUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_on_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ON_${on}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - ON for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - ON sent for flight ${pFlightNum} departing utc ${date} with new ON: ${on}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  IN  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "inUTC":"1245"
}

conditions: Flight must have OUT OFF ON already.


*/
router.post('/in', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let inUTC = v.trim(body.inUTC);
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
    !day == 'd7'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (!v.count(inUTC) >= 1 && !v.count(inUTC) <= 4 && isNaN(inUTC)) {
    res.status(400).json({ error: 'inUTC must be number minimum 1 and maximum 4 digit.' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had air turnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (v(flightData[0].OUTudt).trim() == '' || v(flightData[0].OFFudt).trim() == '' || v(flightData[0].ONudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must have OUT OFF ON filled first before sending IN value`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let on = v(flightData[0].ONudt).trim().padLeft(4, '0');
        let inValue = v(inUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_in_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}IN_${on}${inValue}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - IN for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - IN sent for flight ${pFlightNum} departing utc ${date} with new IN: ${inValue}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  ETA  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "etaUTC":"1245"
}

conditions: Flight must not have OUT OFF ON IN. Tell user to use RMA (remove arrival) RMD (remove departure).


*/
router.post('/eta', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let etaUTC = v.trim(body.etaUTC);
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
    !day == 'd7'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (!v.count(etaUTC) >= 1 && !v.count(etaUTC) <= 4 && isNaN(etaUTC)) {
    res.status(400).json({ error: 'etaUTC must be number minimum 1 and maximum 4 digit.' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum && v.trim(x.sequence) == 10));


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} with local date ${flightData[0].numericFlightDate} had air turnback or ground turnback or divert-continue etc. You need to login to MVT to change this flight.`});
      } else if (!v(flightData[0].OUTudt).trim() == '' || !v(flightData[0].OFFudt).trim() == '' || !v(flightData[0].ONudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must not have OUT OFF ON IN . Please use RMA (remove arrival) and RMD (remove departure)`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let out = v(flightData[0].OUTudt).trim().padLeft(4, '0');
        let eta = v(etaUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_eta_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}OFF${out}${eta}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - OFF for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - OFF sent for flight ${pFlightNum} departing utc ${date} with new OFF: ${eta}`});
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
