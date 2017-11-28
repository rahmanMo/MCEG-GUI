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

  // let obj = JSON.parse(fs.readFileSync('../../data/data.json', 'utf8'));
    fs.readFile(__dirname + '/../../data/data.json', (err, json) => {
      let obj = JSON.parse(json);
      res.json(obj);
      // res.send(JSON.stringify(json));
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
