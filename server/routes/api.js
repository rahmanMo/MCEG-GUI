const express = require('express');
const router = express.Router();
const dbPath = require('../../data/data.json');


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

// Get users
router.get('/flights', (req, res) => {

  res.send(JSON.stringify(dbPath));
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


});

module.exports = router;
