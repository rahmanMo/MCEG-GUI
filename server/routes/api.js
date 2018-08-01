// all api endpoints
// for drop location use listed below
//   /mnt/gcsfile01/STG1/adh_receive/
//   /mnt/gcsfile01/STG2/adh_receive/
//   /mnt/gcsfile01/STG3/adh_receive/

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
  STG2D0,
  STG2D1,
  STG2D2,
  STG2D3,
  STG2D4,
  STG2D5,
  STG2D6,
  STG2D7,
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
//////////////////////////// Utility functions //////////////////////
/////////////////////////////////////////////////////////////////////

// validate time

const validateTime = (value) => {
  return x = moment(value, 'HHmm', true).isValid();
};

// get individual flight data using flight num
const getByFlightNum = (stg,flightNum,day) => {

  return new Promise(function(resolve, reject) {

    if (v(flightNum).count() == 1) {
      flightNum = `   ${flightNum} `;
    } else if (v(flightNum).count() == 2) {
      flightNum = `  ${flightNum} `
    } else if (v(flightNum).count() == 3) {
      flightNum = ` ${flightNum} `
    } else if (v(flightNum).count() == 4) {
      flightNum = `${flightNum} `
    }


    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 1 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG1D0  ///////////////////////////////////
    if (stg == 'STG1' && day == 'D0') {
      STG1D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D0.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D0.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D1 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D1') {
      STG1D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D1.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D1.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG1D2 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D2') {
      STG1D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D2.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D2.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D3 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D3') {
      STG1D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D3.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D3.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D4 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D4') {
      STG1D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D4.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D4.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D5 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D5') {
      STG1D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D5.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D5.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D6 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D6') {
      STG1D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D6.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D6.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D7 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D7') {
      STG1D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D7.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D7.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////
    ///////////////////////////// End of stage 1 ////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 2 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG2D0  ///////////////////////////////////
    if (stg == 'STG2' && day == 'D0') {
      STG2D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D0.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D0.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D1 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D1') {
      STG2D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D1.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D1.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG2D2 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D2') {
      STG2D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D2.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D2.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D3 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D3') {
      STG2D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D3.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D3.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D4 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D4') {
      STG2D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D4.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D4.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D5 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D5') {
      STG2D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D5.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D5.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D6 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D6') {
      STG2D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D6.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D6.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D7 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D7') {
      STG2D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D7.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D7.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////
    ///////////////////////////// End of stage 2 ////////////////////////////
    /////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 3 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG3D0  ///////////////////////////////////
    if (stg == 'STG3' && day == 'D0') {
      STG3D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D0.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D0.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D1 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D1') {
      STG3D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D1.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D1.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG3D2 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D2') {
      STG3D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D2.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D2.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D3 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D3') {
      STG3D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D3.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D3.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D4 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D4') {
      STG3D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D4.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D4.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D5 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D5') {
      STG3D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D5.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D5.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D6 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D6') {
      STG3D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D6.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D6.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D7 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D7') {
      STG3D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D7.find({ identifier: flightNum }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D7.find({ identifier: flightNum }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// End of stage 3 ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
  });

}
// get individual flight data using fsdailyId
const getByFsdailyId = (stg,fsdailyId,day) => {

  return new Promise(function(resolve, reject) {

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 1 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG1D0  ///////////////////////////////////
    if (stg == 'STG1' && day == 'D0') {
      STG1D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D1 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D1') {
      STG1D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG1D2 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D2') {
      STG1D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D3 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D3') {
      STG1D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D4 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D4') {
      STG1D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D5 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D5') {
      STG1D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D6 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D6') {
      STG1D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG1D7 //////////////////////////////
    } else if (stg == 'STG1' && day == 'D7') {
      STG1D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG1D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG1D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////
    ///////////////////////////// End of stage 1 ////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 2 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG2D0  ///////////////////////////////////
    if (stg == 'STG2' && day == 'D0') {
      STG2D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D1 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D1') {
      STG2D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG2D2 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D2') {
      STG2D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D3 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D3') {
      STG2D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D4 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D4') {
      STG2D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D5 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D5') {
      STG2D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D6 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D6') {
      STG2D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG2D7 //////////////////////////////
    } else if (stg == 'STG2' && day == 'D7') {
      STG2D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG2D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG2D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////
    ///////////////////////////// End of stage 2 ////////////////////////////
    /////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////
    /////////////////////////// Start of stage 3 ///////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////  STG3D0  ///////////////////////////////////
    if (stg == 'STG3' && day == 'D0') {
      STG3D0.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D0.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D1 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D1') {
      STG3D1.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D1.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });


      //////////////////////////////// STG3D2 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D2') {
      STG3D2.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D2.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D3 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D3') {
      STG3D3.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D3.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D4 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D4') {
      STG3D4.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D4.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D5 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D5') {
      STG3D5.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D5.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D6 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D6') {
      STG3D6.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D6.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });

      //////////////////////////////// STG3D7 //////////////////////////////
    } else if (stg == 'STG3' && day == 'D7') {
      STG3D7.find().exec(function(err, results) {
        // if mongodb is in the process of deleting and inserting new data.
        if (results.length < 900) {
          setTimeout(() => {
            STG3D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
              if (err) {

                reject(err);
              } else {
                resolve(flights);
              }
            });
          }, 5000);
        } else {
          STG3D7.find({ csvFSDailyID: `${fsdailyId}` }).exec(function(err, flights) {
            if (err) {

              reject(err);
            } else {
              resolve(flights);
            }
          });
        }
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// End of stage 3 ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
  });

}



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
//////////////////////////// STG2 ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
router.get('/stg2/d0', (req, res) => {
  console.log('Requesting flights for stage 2 day 0');
  STG2D0.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D0.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 0');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D0.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 0');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d1', (req, res) => {
  console.log('Requesting flights for stage 2 day 1');
  STG2D1.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D1.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 1');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D1.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 1');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d2', (req, res) => {
  console.log('Requesting flights for stage 2 day 2');
  STG2D2.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D2.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 2');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D2.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 2');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d3', (req, res) => {
  console.log('Requesting flights for stage 2 day 3');
  STG2D3.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D3.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 3');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D3.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 3');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d4', (req, res) => {
  console.log('Requesting flights for stage 2 day 4');
  STG2D4.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D4.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 4');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D4.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 4');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d5', (req, res) => {
  console.log('Requesting flights for stage 2 day 5');
  STG2D5.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D5.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 5');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D5.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 5');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d6', (req, res) => {
  console.log('Requesting flights for stage 2 day 6');
  STG2D6.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D6.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 6');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D6.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 6');
          console.log(err);
        } else {
          res.json(flights);
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
router.get('/stg2/d7', (req, res) => {
  console.log('Requesting flights for stage 2 day 7');
  STG2D7.find().exec(function(err, results) {
    // if mongodb is in the process of deleting and inserting new data.
    if (results.length < 900) {
      setTimeout(() => {
        STG2D7.find({}).exec(function(err, flights) {
          if (err) {
            console.log('Error getting the flights from stage 2 day 7');
            console.log(err);
          } else {
            res.json(flights);
          }
        });
      }, 5000);
    } else {
      STG2D7.find({}).exec(function(err, flights) {
        if (err) {
          console.log('Error getting the flights from stage 2 day 7');
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

// this will get you multiple seq as well as cancelled segment

router.get('/flight/:stg/:day/:flightNum', (req, res) => {
  let stg = v(req.params.stg).trim().upperCase();
  let day = v(req.params.day).trim().upperCase();
  let flightNum = v(req.params.flightNum).trim();

  if (stg != 'STG1' && stg != 'STG3') {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7') {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(flightNum).count() > 4 || v(flightNum).count() < 1 || v(flightNum).isNumeric() === false) {
    res.json({ error: 'flightNum must be min 1 digit max 4 digit' });
  } else {

    getByFlightNum(stg,flightNum,day).then(flights => {
      if (flights == [] || flights == '') {
        res.json({ message: 'no flights found' });
      } else {
        res.json(flights);
      }
    });

  }
});

///////////////////////////// Get Individual Flight Data using fsdailyId ////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Required params:
// {
//   "stg":"stg1",
//   "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
//   "fsdailyId":"1234567"
//
// }

// this will get you single flight

router.get('/id/:stg/:day/:fsdailyId', (req, res) => {
  let stg = v(req.params.stg).trim().upperCase();
  let day = v(req.params.day).trim().upperCase();
  let fsdailyId = v(req.params.fsdailyId).trim();

  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3') {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7') {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {

    getByFsdailyId(stg,fsdailyId,day).then(flight => {
      if (flight == [] || flight == '') {
        res.json({ message: 'no flight found' });
      } else {
        res.json(flight);
      }
    });

  }
});



////////////////////////  POST EVENT WITH ADHOC MESSAGE ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "adhoc16":"ADH016_007620170503MSYJFK1400OUT1410"
}

*/

router.post('/send', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let adhoc16 = body.adhoc16;
  console.log(`Adhoc event processing with data: ${stg} and ${adhoc16}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3') {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else {
    try {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let timestamp = moment(new Date()).format('MMM-DD-YYYY | HH:mm:SS');
        let fileName = `mceg_adhoc16_${now}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhoc16).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName} - Failed!!`});
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


////////////////////////  POST OUT EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "outUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/out', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let outUTC = v(body.outUTC).trim().padLeft(4,'0');
  let validateOUT = validateTime(outUTC);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(outUTC).count() != 4 || v(outUTC).isNumeric() === false || validateOUT == false || body.outUTC == '' || body.outUTC == null) {
    res.json({ error: 'outUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OFFudt).trim() != '' || v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} already have OFF or ON or IN. Please use RMA (remove arrival) or RMD (remove departure) before setting new OUT`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let out = v(outUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_out_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}OUT${out}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - OUT for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - OUT sent for flight ${pFlightNum} departing utc ${date} with new OUT: ${out}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST OFF EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "offUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/off', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let offUTC = v(body.offUTC).trim().padLeft(4,'0');
  let validateOFF = validateTime(offUTC);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(offUTC).count() != 4 || v(offUTC).isNumeric() === false || validateOFF == false || body.offUTC == '' || body.offUTC == null) {
    res.json({ error: 'offUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OUTudt).trim() == '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has no OUT time. Please send OUT event first.`});
      } else if (v(flightData[0].ONudt).trim()!= '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} already have ON or IN. Please use RMA (remove arrival) before setting new OFF`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let out = v(flightData[0].OUTudt).trim().padLeft(4, '0');
        let off = v(offUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_off_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}OFF${out}${off}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - OFF for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - OFF sent for flight ${pFlightNum} departing utc ${date} with new OFF: ${off}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST ON EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "onUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/on', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let onUTC = v(body.onUTC).trim().padLeft(4,'0');
  let validateON = validateTime(onUTC);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(onUTC).count() != 4 || v(onUTC).isNumeric() === false || validateON == false || body.onUTC == '' || body.onUTC == null) {
    res.json({ error: 'onUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OUTudt).trim() == '' || v(flightData[0].OFFudt).trim() == '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should already have OUT and OFF value and IN should be empty. Please use RMA (remove arrival) for removing IN`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let on = v(onUTC).padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_on_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ON_${on}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - ON for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - ON sent for flight ${pFlightNum} departing utc ${date} with new ON: ${on}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST IN EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "inUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/in', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let inUTC = v(body.inUTC).trim().padLeft(4,'0');
  let validateIN = validateTime(inUTC);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(inUTC).count() != 4 || v(inUTC).isNumeric() === false || validateIN == false || body.inUTC == '' || body.inUTC == null) {
    res.json({ error: 'inUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OUTudt).trim() == '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has no OUT time. Please send OUT event first.`});
      } else if (v(flightData[0].OUTudt).trim() == '' || v(flightData[0].OFFudt).trim() == '' || v(flightData[0].ONudt).trim() == '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should already have OUT OFF ON filled before sending IN.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let onUTC = v(flightData[0].ONudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_in_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}IN_${onUTC}${inUTC}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - IN for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - IN sent for flight ${pFlightNum} departing utc ${date} with new IN: ${inUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST ETD EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "etdUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/etd', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let etdUTC = v(body.etdUTC).trim().padLeft(4,'0');
  let validateETD = validateTime(etdUTC);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(etdUTC).count() != 4 || v(etdUTC).isNumeric() === false || validateETD == false || body.etdUTC == '' || body.etdUTC == null) {
    res.json({ error: 'etdUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OUTudt).trim() != '' || v(flightData[0].OFFudt).trim() != '' || v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should not already have OUT OFF ON IN. Please use RMA (remove arrival) or RMD (remove departure) before sending ETD`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_etd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETD${etdUTC}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - ETD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - ETD sent for flight ${pFlightNum} departing utc ${date} with new ETD: ${etdUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST ETA EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "etaUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/eta', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let etaUTC = v(body.etaUTC).trim().padLeft(4,'0');
  let validateETA = validateTime(etaUTC);
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${etaUTC}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(etaUTC).count() != 4 || v(etaUTC).isNumeric() === false || validateETA == false || body.etaUTC == '' || body.etaUTC == null) {
    res.json({ error: 'etaUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should not already have ON IN. Please use RMA (remove arrival) before sending ETA`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_eta_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETA${etaUTC}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - ETA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - ETA sent for flight ${pFlightNum} departing utc ${date} with new ETA: ${etaUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST ETO EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "etoUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/eto', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let etoUTC = v(body.etoUTC).trim().padLeft(4,'0');
  let validateETO = validateTime(etoUTC);
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${etoUTC}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(etoUTC).count() != 4 || v(etoUTC).isNumeric() === false || validateETO == false || body.etoUTC == '' || body.etoUTC == null) {
    res.json({ error: 'etoUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].OFFudt).trim() != '' || v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should not already have OFF ON IN`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_eto_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ETO${etoUTC}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - ETO for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - ETO sent for flight ${pFlightNum} departing utc ${date} with new ETO: ${etoUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST EON EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "eonUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/eon', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let eonUTC = v(body.eonUTC).trim().padLeft(4,'0');
  let validateEON = validateTime(eonUTC);
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${eonUTC}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(eonUTC).count() != 4 || v(eonUTC).isNumeric() === false || validateEON == true || body.eonUTC == '' || body.eonUTC == null) {
    res.json({ error: 'eonUTC must be 4 digit valid utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else if (v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} should not already have ON IN`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_eon_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}EON${eonUTC}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - EON for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - EON sent for flight ${pFlightNum} departing utc ${date} with new EON: ${eonUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST SUB EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "tailNum": "190" (must be 3 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/sub', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let tailNum = v(body.tailNum).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${tailNum}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(tailNum).count() != 3 || v(tailNum).isNumeric() === false || body.tailNum == '' || body.tailNum == null) {
    res.json({ error: 'tailNum must be 3 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} flight has negative tail`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_sub_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}SUB${tailNum}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - SUB for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - SUB sent for flight ${pFlightNum} departing utc ${date} with new tail: ${tailNum}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST CNL EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/cnl', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} already cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} already have negative tail number`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_cnl_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}CNL`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - CNL for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - CNL sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST DEL EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/del', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let tailNum = v(body.tailNum).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_del_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}DEL`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - DEL for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - DEL sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST GTD EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "depGate": "A14" (pad with blank space to maintain 4 character)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/gtd', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let depGate = v(body.depGate).trim().padLeft(4,' ');
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${depGate}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(depGate).count() != 4 || body.depGate == '' || body.depGate == null) {
    res.json({ error: 'depGate must be min 1 and max 4 character' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_gtd_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTD${depGate}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - GTD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - GTD sent for flight ${pFlightNum} departing utc ${date} with new departure gate: ${depGate}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST GTA EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "arrGate": "A14" (pad with blank space to maintain 4 character)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/gta', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let arrGate = v(body.arrGate).trim().padLeft(4,' ');
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${arrGate}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(arrGate).count() != 4 || body.arrGate == '' || body.arrGate == null) {
    res.json({ error: 'arrGate must be min 1 and max 4 character' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].cancelled).trim() == 'X') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is cancelled.`});
      } else if (v(flightData[0].previousTailNumber).trim() == 'CANX' || v(flightData[0].tailNumber).startsWith('-', 0)) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_gta_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GTA${arrGate}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - GTA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - GTA sent for flight ${pFlightNum} departing utc ${date} with new arrival gate: ${arrGate}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST RIN EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must have negative tail.


*/
router.post('/rin', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == false) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} does not is on a negative tail`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_rin_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}RIN`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - RIN for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - RIN sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST REM EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/rem', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} already is on a negative tail`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_rem_${now}`;
        let adhocStremg = `ADH016_${pFlightNum}${date}${origin}${dest}${std}REM`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStremg).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - REM for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - REM sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST ASN EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "tailNum": "190" (must be 3 digit)
}

conditions: Flight must have negative tail.


*/
router.post('/asn', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let tailNum = v(body.tailNum).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${tailNum}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(tailNum).count() != 3 || v(tailNum).isNumeric() === false || body.tailNum == '' || body.tailNum == null) {
    res.json({ error: 'tailNum must be 3 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == false) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} does not have negative tail`});
      }else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_asn_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}ASN${tailNum}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - ASN for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - ASN sent for flight ${pFlightNum} departing utc ${date} with new tail: ${tailNum}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST UDD EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must not have negative tail.


*/
router.post('/udd', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].ETDudt).trim() == v(flightData[0].STDudt).trim()) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} have ETD same as STD.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_udd_${now}`;
        let adhocStuddg = `ADH016_${pFlightNum}${date}${origin}${dest}${std}UDD`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStuddg).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - UDD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - UDD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});



////////////////////////  POST UDA EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must have negative tail.


*/
router.post('/uda', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].ETAudt).trim() == v(flightData[0].STAudt).trim()) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} have ETA same as STA.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_uda_${now}`;
        let adhocStudag = `ADH016_${pFlightNum}${date}${origin}${dest}${std}UDA`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStudag).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - UDA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - UDA sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST RMD EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must not have negative tail.


*/
router.post('/rmd', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].OUTudt).trim() == '' && v(flightData[0].OFFudt).trim() == '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} have OUT and OFF already empty.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_rmd_${now}`;
        let adhocStrmdg = `ADH016_${pFlightNum}${date}${origin}${dest}${std}RMD`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStrmdg).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - RMD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - RMD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST RMA EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must not have negative tail.


*/
router.post('/rma', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].ONudt).trim() == '' && v(flightData[0].INudt).trim() == '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} have ON and IN already empty.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_rma_${now}`;
        let adhocStrmag = `ADH016_${pFlightNum}${date}${origin}${dest}${std}RMA`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStrmag).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - RMA for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - RMA sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST GRD EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must not have negative tail.


*/
router.post('/grd', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].OFFudt).trim() != '' || v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} should have OFF ON and IN empty.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).fogrdt('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_grd_${now}`;
        let adhocStgrdg = `ADH016_${pFlightNum}${date}${origin}${dest}${std}GRD`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStgrdg).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - GRD for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - GRD sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST AIR EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
}

conditions: Flight must not have negative tail.


*/
router.post('/air', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) == true) {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} is on a negative tail`});
      } else if (v(flightData[0].ONudt).trim() != '' || v(flightData[0].INudt).trim() != '') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} should have ON and IN empty.`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).foairt('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_air_${now}`;
        let adhocStairg = `ADH016_${pFlightNum}${date}${origin}${dest}${std}AIR`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocStairg).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - AIR for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - AIR sent for flight ${pFlightNum} departing utc ${date}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST DVC EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "day":"d0", ( up to d7 available, d0 is yesterday, d1 is today and so on)
  "fsdailyId": "4876446", (validate 7 digit)
  "divertCity": "FLL", (validate 3 letters)
  "etaUTC": "1900" (pad with zero, force it to become 4 digit)
}

conditions: Flight must be seq 10 and NOT have negative tail.


*/
router.post('/dvc', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let day = v(body.day).trim().upperCase();
  let fsdailyId = v(body.fsdailyId).trim();
  let divertCity = v(body.divertCity).trim().upperCase();
  let etaUTC = v(body.etaUTC).trim().padLeft(4,'0');
  console.log(`Adhoc event processing with data: ${stg}, ${day}, ${fsdailyId}, ${divertCity}, ${etaUTC}`);
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg3' });
  } else if (day != 'D0' && day != 'D1' && day != 'D2' && day != 'D3' && day != 'D4' && day != 'D5' && day != 'D6' && day != 'D7' || body.day == '' || body.day == null) {
    res.json({ error: 'day must be d# based on flight local date; # is in range 0 to 7; ex: d0 is yesterday d1 is today and so on' });
  } else if (v(fsdailyId).count() != 7 || v(fsdailyId).isNumeric() === false || body.fsdailyId == '' || body.fsdailyId == null) {
    res.json({ error: 'fsDailyId must be 7 digit' });
  } else if (v(divertCity).count() != 3 || v(divertCity).isAlpha() === false || body.divertCity == '' || body.divertCity == null) {
    res.json({ error: 'divertCity must be 3 character EX: JFK' });
  } else if (v(etaUTC).count() != 4 || v(etaUTC).isNumeric() === false || body.etaUTC == '' || body.etaUTC == null) {
    res.json({ error: 'etaUTC must be 4 digit utc time, ex: 1500, 0059 etc' });
  } else {
    try {

      //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
      // filter data by flight number
      let flightData = await getByFsdailyId(stg,fsdailyId,day).then(data => {return data});


      // handle no flight found + other exceptions
      if (flightData == '' || flightData == {}) {
        res.json({ error : `flight with dailyId ${fsdailyId} not found for day ${day}`});
      } else if (v(flightData[0].tailNumber).startsWith('-', 0) || v(flightData[0].sequence).trim() != '10') {
        res.json({ error : `flight with dailyId ${fsdailyId} for day ${day} with local date ${flightData[0].numericFlightDate} has negative tail or is not seq 10`});
      } else {

        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let pFlightNum = v(flightData[0].identifier).trim().padLeft(4, '0');
        let date = v.trim(flightData[0].numGMTDate);
        let origin = v.trim(flightData[0].origin);
        let dest = v.trim(flightData[0].destination);
        let std = v(flightData[0].STDudt).trim().padLeft(4, '0');
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_dvc_${now}`;
        let adhocString = `ADH016_${pFlightNum}${date}${origin}${dest}${std}DVC${etaUTC}${divertCity}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - DVC for flight ${pFlightNum} departing utc ${date} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - DVC sent for flight ${pFlightNum} departing utc ${date} with divert city ${divertCity}, ETA ${etaUTC}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      }

    } catch (error) {
      console.log(error);
    }
  }

});


////////////////////////  POST NEW EVENT  ////////////////////////////
/*
Required params:
{
  "stg":"stg1",
  "flightNum":"55",
  "utcOriginDate":"20170812",
  "origin":"JFK",
  "destination":"BOS",
  "stdUTC":"1234",
  "staUTC":"1345",
  "nextDayCrossover":"1", (This is true or false. false means it will not crossover next day. true means it will.)
  "tailNum":"245",

}

conditions: Plot must have space to avoid overlap.


*/
router.post('/new', async (req, res) => {
  let body = req.body;
  let stg = v(body.stg).trim().upperCase();
  let flightNum = v(body.flightNum).trim().padLeft(4,'0');
  let utcOriginDate = v(body.utcOriginDate).trim();
  let dateValidation = moment(utcOriginDate, 'YYYYMMDD', true);
  let origin = v(body.origin).trim().upperCase();
  let destination = v(body.destination).trim().upperCase();
  let stdUTC = v(body.stdUTC).trim().padLeft(4,'0');
  let validateSTD = validateTime(stdUTC);
  let staUTC = v(body.staUTC).trim().padLeft(4,'0');
  let validateSTA = validateTime(staUTC);
  let nextDayCrossover = v(body.nextDayCrossover).trim();
  let tailNum = v(body.tailNum).trim();
  if (stg != 'STG1' && stg != 'STG2' && stg != 'STG3' || body.stg == '' || body.stg == null) {
    res.json({ error: 'stg must be stg1 or stg2 or stg3' });
  } else if (v(flightNum).count() != 4 || v(flightNum).isNumeric() == false || body.flightNum == '' || body.flightNum == null) {
    res.json({ error: 'flightNum must be number minimum 1 and maximum 4 digit.' });
  } else if (dateValidation.isValid() == false || body.utcOriginDate == '' || body.utcOriginDate == null) {
    res.json({ error: 'utcOriginDate must be in the format YYYYMMDD.' });
  } else if (v(origin).count() != 3 || v(origin).isAlpha() == false || body.origin == '' || body.origin == null) {
    res.json({ error: 'origin must be airport code EX: JFK' });
  } else if (v(destination).count() != 3 || v(destination).isAlpha() == false || body.destination == '' || body.destination == null) {
    res.json({ error: 'destination must be airport code EX: JFK' });
  } else if (v.count(stdUTC) != 4 || isNaN(stdUTC) || validateSTD == false || body.stdUTC == '' || body.stdUTC == null) {
    res.json({ error: 'stdUTC must be 4 digit valid time value in 24hr format like 0025, 1545 etc' });
  } else if (v.count(staUTC) != 4 || isNaN(staUTC) || validateSTA == false || body.staUTC == '' || body.staUTC == null) {
    res.json({ error: 'staUTC must be 4 digit valid time value in 24hr format like 0025, 1545 etc' });
  } else if (nextDayCrossover != "1" && nextDayCrossover != "0" || body.nextDayCrossover == '' || body.nextDayCrossover == null) {
    res.json({ error: 'nextDayCrossover must be either 1 or 0 which indicates true and false' });
  } else if (v.count(tailNum) != 3 || isNaN(tailNum) || body.tailNum == '' || body.tailNum == null) {
    res.json({ error: 'tailNum must be 3 digit' });
  } else {
    try {



        //////////////////////////////// prep data for adhoc 16 /////////////////////////////////
        let dropLocation;
        if (stg == 'STG1') {
          dropLocation = '/mnt/gcsfile01/STG1/adh_receive';
        } else if (stg == 'STG2') {
          dropLocation = '/mnt/gcsfile01/STG2/adh_receive';
        } else if (stg == 'STG3') {
          dropLocation = '/mnt/gcsfile01/STG3/adh_receive';
        }
        let now = moment(new Date()).format('MM_DD_YYYY_HH_mm_ss_x');
        let fileName = `mceg_adhoc16_new_${now}`;
        let adhocString = `ADH016_${flightNum}${utcOriginDate}${origin}${destination}${stdUTC}NEW${staUTC}${nextDayCrossover}${tailNum}`;
        let job = await fs.writeFile(`${dropLocation}/${fileName}.txt`, adhocString).then((err) => {
         if (err) {
          console.log(err)
           res.json({error: `Error sending File: ${fileName}.txt - NEW for flight ${flightNum} departing utc ${utcOriginDate} Failed!!`});
         } else {
          res.status(201).json({message: `File: ${fileName}.txt sent at ${now} - NEW sent for flight ${flightNum} departing utc ${utcOriginDate}`});
         }
        });
        ////////////////////////////////////// end of adhoc 16 /////////////////////////////////

      } catch (error) {
      console.log(error);
    }
  }

});




module.exports = router;
