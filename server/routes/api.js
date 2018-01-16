const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const {Flight3} = require('../models/flight');

// const db = "mongodb://localhost:27017/flights";
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flights');

// mongoose.Promise = global.Promise;
// mongoose.connect(db, function(err) {
//     if(err) {
//         console.log('Connection error');
//     }
// });

// router.get('/flights3', (req, res) => {
//   Flight3.find().then((flights) => {
//     res.send({flights});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
router.get('/flights3', function(req, res) {
    console.log('Requesting flights for stage 3');
    Flight3.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
            } else {
                res.json(flights);
            }
        });
});

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
