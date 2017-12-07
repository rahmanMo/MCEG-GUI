const express = require('express');
const router = express.Router();
const fs = require('fs');
// const path = require( "path" );
// const dbPath = require('../../data/data.json');


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get flights
router.get('/flights', (req, res) => {

    fs.copyFileSync(__dirname + '/../../data/data.json', __dirname + 'data.json');

  // let obj = JSON.parse(fs.readFileSync('../../data/data.json', 'utf8'));
    fs.readFile(__dirname + 'data.json', (err, json) => {
      let obj = JSON.parse(json);
      let d = new Date();
      let dateL = d.toLocaleDateString();
      var timeL = d.toLocaleTimeString();
      console.log(`Client request/response local dateTime: ${dateL} ${timeL}`);
      res.json(obj);
      // if (err){
      //   setTimeout(function(){
      //     fs.readFile(__dirname + '/../../data/data.json', (err, json) => {
      //       let obj = JSON.parse(json);
      //       let d = new Date();
      //       let dateL = d.toLocaleDateString();
      //       var timeL = d.toLocaleTimeString();
      //       console.log(`Client request/response local dateTime: ${dateL} ${timeL}`);
      //       res.json(obj);
      //     });
      //    }, 1000);
      // }
  });

});

module.exports = router;


  // let dbPath = require('../../data/data.json');
  // res.send(JSON.stringify(dbPath));
    // connection((db) => {
    //     db.collection('users')
    //         .find()
    //         .toArray()
    //         .then((users) => {
    //             response.data = users;
    //             res.json(response);
    //         })
    //         .catch((err) => {
    //             sendError(err, res);
    //         });
    // });
