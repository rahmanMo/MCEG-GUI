const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs-extra');
const v = require('voca');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// each events ////////////////////////////////////////

//////////////////////// departure gate change (OUT) ////////////////////////////
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
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(outUTC) >= 1 && !v.count(outUTC) <= 4 && isNaN(outUTC)) {
    res.status(400).json({ error: 'outUTC must be number minimum 1 and maximum 4 digit' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let out = v.padLeft(outUTC, 4, '0').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});

//////////////////////// departure gate change (gtd) ////////////////////////////
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
    !day == 'd7' ||
    !day == 'd8'
  ) {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d1; d0 is yesterday d1 is today' });
  } else if (!v.count(flightNum) >= 1 && !v.count(flightNum) <= 4 && isNaN(flightNum)) {
    res.status(400).json({ error: 'flightNum must be number minimum 1 and maximum 4 digit' });
  } else if (!v.count(depGate) >= 1 && !v.count(depGate) <= 4) {
    res.status(400).json({ error: 'gate must be number minimum 1 and maximum 4 character/number' });
  } else {
    try {
      // filter data by flight number
      let flightData = await fetch(`http://localhost/api/${stg}/${day}`).then(res => res.json()).then(allData => allData.filter(x => v.trim(x.identifier) == flightNum));

      // handle no flight found
      if (flightData == '' || flightData == {}) {
        res.status(404).json({ error : `flight ${flightNum} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v.padLeft(flightNum, 4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v.trim(flightData[0].STDudt);
        let gate = v.padLeft(depGate, 4, ' ').toUpperCase();
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${gate}`;
        let job = await fs.writeFile(`./sample/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Something went wrong. ${adhocString}: GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({adhoc: `${adhocString}: GTD sent for flight ${pFlightNum} departing utc ${date}`});
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
