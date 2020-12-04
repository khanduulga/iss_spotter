const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, response, body) => {
    //error handling
    if (err) {
      callback(err, null);
      return;
    }

    //checking statusCode for request
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchin IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const ip = JSON.parse(body);
    callback(null, ip['ip']);


  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (err, response, body) => {
    //error handling
    if (err) {
      callback(err, null);
      return;
    }

    //checking statusCode for request
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchin coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //get coordinates in latitude and longitude
    const { lat, lon } = JSON.parse(body);
    callback(null, { lat, lon });

  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords['lat']}&lon=${coords['lon']}`, (err, response, body) => {
    //error handling
    if (err) {
      callback(err, null);
      return;
    }

    //checking statusCode for request
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchin ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, passes) => {
        if (err) {
          callback(err, null);
          return;
        }

        //happy path
        callback(null, passes);

      })
    })
  })
}



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };