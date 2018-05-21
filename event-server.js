const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const api = require('./server/routes/event-api');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/api', api);

app.listen(port, '0.0.0.0', () => {
  console.log(`Started up at port ${port}`);
});
