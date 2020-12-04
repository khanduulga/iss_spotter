//index.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((err, ip) => {
//   //handles error
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   //IP
//   console.log("It worked! Returned IP:", ip);
// });


// fetchCoordsByIP('24.80.120.36', (err, data) => {
//   if (err) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coords:' , data);
// }); 


// fetchISSFlyOverTimes({ lat: 49.2825, lon: -123.1291 }, (err, data) =>{
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   }

//   console.log('It worked! Returned Times:' , data);
// })

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});