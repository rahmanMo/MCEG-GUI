const express = require('express');
const moment = require('moment');
const fs = require('fs-extra');
const v = require('voca');
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

//////////////////////////////////////////////////////////////////////////
//////////////////////////// STG1 ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg1/d0', (req, res) => {
  console.log('Requesting flights for stage 1 day 0');
  STG1D0.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D0.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 0');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
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
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d1', (req, res) => {
  console.log('Requesting flights for stage 1 day 1');
  STG1D1.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D1.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 1');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
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
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d2', (req, res) => {
  console.log('Requesting flights for stage 1 day 2');
  STG1D2.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D2.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 2');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D2.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 2');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d3', (req, res) => {
  console.log('Requesting flights for stage 1 day 3');
  STG1D3.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D3.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 3');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D3.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 3');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d4', (req, res) => {
  console.log('Requesting flights for stage 1 day 4');
  STG1D4.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D4.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 4');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D4.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 4');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d5', (req, res) => {
  console.log('Requesting flights for stage 1 day 5');
  STG1D5.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D5.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 5');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D5.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 5');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d6', (req, res) => {
  console.log('Requesting flights for stage 1 day 6');
  STG1D6.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D6.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 6');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D6.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 6');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d7', (req, res) => {
  console.log('Requesting flights for stage 1 day 7');
  STG1D7.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG1D7.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 1 day 7');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG1D7.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 7');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////// STG3 ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg3/d0', (req, res) => {
  console.log('Requesting flights for stage 3 day 0');
  STG3D0.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D0.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 0');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D0.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 0');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d1', (req, res) => {
  console.log('Requesting flights for stage 3 day 1');
  STG3D1.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D1.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 1');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D1.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 1');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d2', (req, res) => {
  console.log('Requesting flights for stage 3 day 2');
  STG3D2.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D2.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 2');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D2.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 2');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d3', (req, res) => {
  console.log('Requesting flights for stage 3 day 3');
  STG3D3.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D3.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 3');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D3.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 3');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d4', (req, res) => {
  console.log('Requesting flights for stage 3 day 4');
  STG3D4.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D4.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 4');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D4.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 4');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d5', (req, res) => {
  console.log('Requesting flights for stage 3 day 5');
  STG3D5.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D5.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 5');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D5.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 5');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d6', (req, res) => {
  console.log('Requesting flights for stage 3 day 6');
  STG3D6.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D6.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 6');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D6.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 6');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d7', (req, res) => {
  console.log('Requesting flights for stage 3 day 7');
  STG3D7.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG3D7.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 3 day 7');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG3D7.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 7');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

///////////////////////////// Get Individual Flight Data ////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Required params:
// {
//   "stg":"stg1",
//   "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
//   "flightNum":"1234"
//
// }

router.get('/flight/:stg/:day/:flightNum', (req, res) => {
  let stg = v(req.params.stg).trim().upperCase();
  let day = v(req.params.day).trim().upperCase();
  let flightNum = v(req.params.flightNum).trim().pad(5, ' ');

  if (stg != 'STG1' && stg != 'STG3') {
    res.status(400).json({ error: 'stg must be stg1 or stg3' });
  } else if (!v(flightNum).isNumeric()) {
    res.status(400).json({ error: 'flightNum must be min 1 digit max 4 digit' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7') {
    res.status(400).json({ error: 'day must be d#; # is in range 0 to 7; ex: d0 is yesterday d1 is today.' });
  } else {
    if (stg == 'STG1' && day == 'D0') {
      STG1D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D0.find({ identifier: `${flightNum}` }).exec(function(err, flights) {
              if (err) {
                console.log('Error getting the flights from stage 3 day 7');
                console.log(err);
              } else {
                res.json(flights);
              }
            });
          }, 5000);
        } else {
          STG1D0.find({ identifier: `${flightNum}` }).exec(function(err, flights) {
            if (err) {
              console.log('Error getting the flights from stage 3 day 7');
              console.log(err);
            } else {
              res.json(flights);
            }
          });
        }
      });
    }
  }
});


////////////////////////  POST EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "adhoc16":"ADH016_007620170503MSYJFK1400OUT1410"
}

conditions: Flight must have negative tail. This event is opposite of REM.


*/
router.post('/send', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let adhoc16 = body.adhoc16;
  console.log(`Adhoc event processing with data: ${stg} and ${adhoc16}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3') {
    res.status(400).json({ error: 'stg must be stg1 or stg3' });
  } else {
    try {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = './sample';
        } else if (stg == 'STG2') {
          dropLocation = './sample';
        } else if (stg == 'STG3') {
          dropLocation = './sample';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_SS_x');
        let timestamp = moment(new Date()).format('MMM-DD-YYYY | HH:mm:SS');
        let fileName = `mceg_adhoc16_${now}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhoc16).then((err) => {
         if (err) {
          console.log(err)
           res.status(404).json({error: `Error sending File: ${fileName} - Failed!!`});
         } else {
          res.status(201).json({message: {
            fileName: fileName,
            timestamp: timestamp}});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

    } catch (error) {
      console.log(error);
    }
  }

});

module.exports = router;
