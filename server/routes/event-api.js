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

conditions: Flight must not have ON IN. Tell user to use RMA (remove arrival).


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
      } else if (!v(flightData[0].ONudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must not have ON IN. Please use RMA (remove arrival)`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
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
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETA${eta}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - ETA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - ETA sent for flight ${pFlightNum} departing utc ${date} with new ETA: ${eta}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  ETD  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "etdUTC":"1245"
}

conditions: Flight must not have OUT OFF ON IN. Tell user to use RMA (remove arrival) RMD (remove departure).


*/
router.post('/etd', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let etdUTC = v.trim(body.etdUTC);
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
  } else if (!v.count(etdUTC) >= 1 && !v.count(etdUTC) <= 4 && isNaN(etdUTC)) {
    res.status(400).json({ error: 'etdUTC must be number minimum 1 and maximum 4 digit.' });
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
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must not have OUT OFF ON IN. Please use RMA (remove arrival) and RMD (remove departure)`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let etd = v(etdUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_etd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETD${etd}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - ETD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - ETD sent for flight ${pFlightNum} departing utc ${date} with new ETD: ${etd}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  ETO  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "etoUTC":"1245"
}

conditions: Flight must not have OFF ON IN. Tell user to use RMA (remove arrival) RMD (remove departure).


*/
router.post('/eto', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let etoUTC = v.trim(body.etoUTC);
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
  } else if (!v.count(etoUTC) >= 1 && !v.count(etoUTC) <= 4 && isNaN(etoUTC)) {
    res.status(400).json({ error: 'etoUTC must be number minimum 1 and maximum 4 digit.' });
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
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must not have OFF ON IN. Please use RMA (remove arrival) and RMD (remove departure)`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let eto = v(etoUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_eto_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETO${eto}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - ETO for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - ETO sent for flight ${pFlightNum} departing utc ${date} with new ETO: ${eto}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  EON  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "eonUTC":"1245"
}

conditions: Flight must not have ON IN. Tell user to use RMA (remove arrival).


*/
router.post('/eon', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let eonUTC = v.trim(body.eonUTC);
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
  } else if (!v.count(eonUTC) >= 1 && !v.count(eonUTC) <= 4 && isNaN(eonUTC)) {
    res.status(400).json({ error: 'eonUTC must be number minimum 1 and maximum 4 digit.' });
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
      } else if (!v(flightData[0].ONudt).trim() == '' || !v(flightData[0].INudt).trim() == '') {
        res.status(404).json({ error : `flight ${flightNum} for day ${day} must not have ON IN. Please use RMA (remove arrival)`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let eon = v(eonUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_eon_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}EON${eon}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - EON for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - EON sent for flight ${pFlightNum} departing utc ${date} with new EON: ${eon}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  SUB  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "newTail":"1245"
}

conditions: Flight must not have negative tail.


*/
router.post('/sub', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let newTail = v.trim(body.newTail);
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
  } else if (!v.count(newTail) >= 1 && !v.count(newTail) <= 3 && isNaN(newTail)) {
    res.status(400).json({ error: 'newTail must be number minimum 1 and maximum 3 digit.' });
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
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let sub = newTail;
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_sub_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}SUB${sub}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - SUB for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - SUB sent for flight ${pFlightNum} departing utc ${date} with new tail: ${sub}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  CNL  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55"
}

conditions: Flight must not have negative tail or already cancelled.


*/
router.post('/cnl', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
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
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_cnl_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}CNL`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - CNL for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - CNL sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  GTD  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "depGate":"12AC"
}

conditions: Flight must be sequence 10 and must not have a negative tail.


*/
router.post('/gtd', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let depGate = v.trim(body.depGate);
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
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'depGate must be number minimum 1 and maximum 4 character.' });
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
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let gtd = v(depGate).padLeft(4, ' ');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gtd}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - GTD sent for flight ${pFlightNum} departing utc ${date} with new departure gate: ${gtd}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  GTA  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "flightNum":"55",
  "arrGate":"12AC"
}

conditions: Flight must be sequence 10 and must not have a negative tail.


*/
router.post('/gta', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let day = v.trim(body.day);
  let flightNum = v.trim(body.flightNum);
  let arrGate = v.trim(body.arrGate);
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
  } else if (!v.count(arrGate) >= 1 && !v.count(arrGate) <= 4) {
    res.status(400).json({ error: 'arrGate must be number minimum 1 and maximum 4 character.' });
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
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let gta = v(arrGate).padLeft(4, ' ');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gta_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTA${gta}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - GTA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - GTA sent for flight ${pFlightNum} departing utc ${date} with new arrival gate: ${gta}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  NEW  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "flightNum":"55",
  "utcOriginDate":"20170812",
  "origin":"JFK",
  "destination":"BOS",
  "stdUTC":"1234",
  "staUTC":"1345",
  "nextDayCrossover":"0", (This is 0 or 1. 0 means it will not crossover next day. 1 means it will.)
  "tailNum":"245",

}

conditions: Tail must have a time slot available in order to avoid overlap.


*/
router.post('/new', async (req, res) => {
  let body = req.body;
  let stg = v.trim(body.stg);
  let flightNum = v.trim(body.flightNum);
  let utcOriginDate = v.trim(body.utcOriginDate);
  let dateValidation = moment(utcOriginDate, 'YYYYMMDD', true);
  let origin = v.trim(body.origin);
  let destination = v.trim(body.destination);
  let stdUTC = v.trim(body.stdUTC);
  let staUTC = v.trim(body.staUTC);
  let nextDayCrossover = v.trim(body.nextDayCrossover);
  let tailNum = v.trim(body.tailNum);
  if (!stg == 'stg1' || !stg == 'stg2' || !stg == 'stg3') {
    res.status(400).json({ error: 'stg must be stg1 or stg3' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (dateValidation.isValid() == false) {
    res.status(400).json({ error: 'utcOriginDate must be in the format YYYYMMDD.' });
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
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let new = v(arrGate).padLeft(4, ' ');
        let dropLocation;
        if (stg == 'stg1') {
          dropLocation = './sample';
        } else if (stg == 'stg2') {
          dropLocation = './sample';
        } else if (stg == 'stg3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_new_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}NEW${new}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - NEW for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `File: ${fileName} sent at ${now} - NEW sent for flight ${pFlightNum} departing utc ${date} with new arrival gate: ${new}`});
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
