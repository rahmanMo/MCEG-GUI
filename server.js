// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const http = require('http');
// const app = express();

// // API file for interacting with MongoDB
// const api = require('./server/routes/api');

// // Parsers
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// // Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));

// // API location
// app.use('/api', api);

// // Send all other requests to the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// //Set Port
// const port = process.env.PORT || '3000';
// app.set('port', port);

// const server = http.createServer(app);

// server.listen(port, () => console.log(`Running on localhost:${port}`));




const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var mongoose = require('mongoose');
var {Flight3} = require('./server/models/flight');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/flights',{
  useMongoClient: true
}).then(() => console.log('mongodb connected')).catch(err => console.log(err));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/flights3', (req, res) => {
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

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
