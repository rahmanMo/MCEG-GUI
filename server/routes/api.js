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

//////////////////////////////////////////////////////////////////////////
//////////////////////////// STG1 ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg1/d0', (req, res) => {
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
router.get('/stg1/d1', (req, res) => {
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d2', (req, res) => {
  console.log('Requesting flights for stage 1 day 2');
  const count = STG1D2.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D2.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 2');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d3', (req, res) => {
  console.log('Requesting flights for stage 1 day 3');
  const count = STG1D3.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D3.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 3');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d4', (req, res) => {
  console.log('Requesting flights for stage 1 day 4');
  const count = STG1D4.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D4.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 4');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d5', (req, res) => {
  console.log('Requesting flights for stage 1 day 5');
  const count = STG1D5.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D5.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 5');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d6', (req, res) => {
  console.log('Requesting flights for stage 1 day 6');
  const count = STG1D6.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D6.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 6');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg1/d7', (req, res) => {
  console.log('Requesting flights for stage 1 day 7');
  const count = STG1D7.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG1D7.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 1 day 7');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

//////////////////////////////////////////////////////////////////////////
//////////////////////////// STG3 ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg3/d0', (req, res) => {
  console.log('Requesting flights for stage 3 day 0');
  const count = STG3D0.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D0.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 0');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d1', (req, res) => {
  console.log('Requesting flights for stage 3 day 1');
  const count = STG3D1.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D1.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 1');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d2', (req, res) => {
  console.log('Requesting flights for stage 3 day 2');
  const count = STG3D2.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D2.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 2');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d3', (req, res) => {
  console.log('Requesting flights for stage 3 day 3');
  const count = STG3D3.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D3.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 3');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d4', (req, res) => {
  console.log('Requesting flights for stage 3 day 4');
  const count = STG3D4.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D4.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 4');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d5', (req, res) => {
  console.log('Requesting flights for stage 3 day 5');
  const count = STG3D5.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D5.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 5');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d6', (req, res) => {
  console.log('Requesting flights for stage 3 day 6');
  const count = STG3D6.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D6.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 6');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

/////////////////////////////////////////////////////////////////////////////
router.get('/stg3/d7', (req, res) => {
  console.log('Requesting flights for stage 3 day 7');
  const count = STG3D7.find().exec(function (err, results) {
    return results.length
  });
  // if mongodb is in the process of deleting and inserting new data.
  if (count < 900) {
    setTimeout(
      STG3D7.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 3 day 7');
          console.log(err);
        } else {
          res.json(flights);
        }
      }),
      3000
    );
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

module.exports = router;
