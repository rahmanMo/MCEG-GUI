
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dbUserName = process.env.dbUserName || '';
const dbPassword = process.env.dbPassword || '';
const dbURL = `mongodb://${dbUserName}:${dbPassword}@ds147589.mlab.com:47589/mceg`;
const { STG1D1, STG1D2, STG1D3, STG3D1, STG3D2, STG3D3 } = require('./server/models/flight');


mongoose.Promise = global.Promise;
mongoose.connect(dbURL,{
  useMongoClient: true
}).then(() => console.log('mongodb connected')).catch(err => console.log(err));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/api/stg1d1', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG1D1.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d2', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG1D2.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg1d3', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG1D3.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});

app.get('/api/stg3d1', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG3D1.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d2', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG3D2.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
                console.log(err);
            } else {
                res.json(flights);
            }
        });
});


app.get('/api/stg3d3', (req, res) => {
  console.log('Requesting flights for stage 3');
  STG3D3.find({})
        .exec(function(err, flights) {
            if (err) {
                console.log('Error getting the flights from stage 3');
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


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
