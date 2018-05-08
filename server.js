
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
// const dbUserName = process.env.dbUserName || '';
// const dbPassword = process.env.dbPassword || '';
// const dbURL = `mongodb://${dbUserName}:${dbPassword}@ds147589.mlab.com:47589/mceg`;
const dbURL = 'mongodb://0.0.0.0:27017/MCEG';
const { STG1D0,
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
        STG3D7 } = require('./server/models/flight');


mongoose.Promise = global.Promise;
mongoose.connect(dbURL,{
  useMongoClient: true
}).then(() => console.log('mongodb connected')).catch(err => console.log(err));

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/api/stg1d0', (req, res) => {
  console.log('Requesting flights for stage 1 day 0');
  STG1D0.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 0');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});

app.get('/api/stg1d1', (req, res) => {
  console.log('Requesting flights for stage 1 day 1');
  STG1D1.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 1');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d2', (req, res) => {
  console.log('Requesting flights for stage 1 day 2');
  STG1D2.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 2');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d3', (req, res) => {
  console.log('Requesting flights for stage 1 day 3');
  STG1D3.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d4', (req, res) => {
  console.log('Requesting flights for stage 1 day 4');
  STG1D4.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 4');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d5', (req, res) => {
  console.log('Requesting flights for stage 1 day 5');
  STG1D5.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 5');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d6', (req, res) => {
  console.log('Requesting flights for stage 1 day 6');
  STG1D6.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 6');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d7', (req, res) => {
  console.log('Requesting flights for stage 1 day 7');
  STG1D7.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 1 day 7');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});

app.get('/api/stg3d0', (req, res) => {
  console.log('Requesting flights for stage 3 day 0');
  STG3D0.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 0');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});

app.get('/api/stg3d1', (req, res) => {
  console.log('Requesting flights for stage 3 day 1');
  STG3D1.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 1');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d2', (req, res) => {
  console.log('Requesting flights for stage 3 day 2');
  STG3D2.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 2');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d3', (req, res) => {
  console.log('Requesting flights for stage 3 day 3');
  STG3D3.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d4', (req, res) => {
  console.log('Requesting flights for stage 3 day 4');
  STG3D4.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 4');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d5', (req, res) => {
  console.log('Requesting flights for stage 3 day 5');
  STG3D5.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 5');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d6', (req, res) => {
  console.log('Requesting flights for stage 3 day 6');
  STG3D6.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 6');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d7', (req, res) => {
  console.log('Requesting flights for stage 3 day 7');
  STG3D7.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3 day 7');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Started up at port ${port}`);
});
