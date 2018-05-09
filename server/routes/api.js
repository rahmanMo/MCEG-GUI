const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  STG1D0,
  STG1D1,
  STG1D2,
  STG1D3,
  STG1D4,
  STG1D5,
  STG1D6,
  STG1D7,
  STG3D0,
  STG3D1,
  STG3D2,
  STG3D3,
  STG3D4,
  STG3D5,
  STG3D6,
  STG3D7
} = require('../models/flight');
// const dbUserName = process.env.dbUserName || '';
// const dbPassword = process.env.dbPassword || '';
// const dbURL = `mongodb://${dbUserName}:${dbPassword}@ds147589.mlab.com:47589/mceg`;
const dbURL = 'mongodb://0.0.0.0:27017/MCEG';
mongoose.Promise = global.Promise;
mongoose
  .connect(dbURL, {
    useMongoClient: true
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

/////////////////////////////////////////////////////////////////////
//////////////////////// all api routes /////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg1d0', (req, res) => {
  console.log('Requesting flights for stage 1 day 0');
  const count = STG1D0.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D0.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 0');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
  } else {
    STG1D0.find({}).exec(function(err, flights) {
      if (err) {
        console.log('Error getting the flights from stage 1 day 0');
        console.log(err);
      } else {
        res.json(flights);
      }
    });
  }
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1d1', (req, res) => {
  console.log('Requesting flights for stage 1 day 1');
  const count = STG1D1.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D1.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 1');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
  } else {
    STG1D1.find({}).exec(function(err, flights) {
      if (err) {
        console.log('Error getting the flights from stage 1 day 1');
        console.log(err);
      } else {
        res.json(flights);
      }
    });
  }
});

module.exports = router;
