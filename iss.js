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

//using IP will get you coordinates in lat and long
const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (err, response, body) => {
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
    
    //get coordinates in latitude and longitude
    const { lat, lon } = JSON.parse(body);
    callback(null, { lat, lon });

  });
};



module.exports = { fetchMyIP, fetchCoordsByIP };