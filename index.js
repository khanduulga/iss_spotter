//index.js

const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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