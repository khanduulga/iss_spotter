// iss_promised.js
const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

/* Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { lat, lon } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const passes = JSON.parse(body).response;
      return passes;
    });
};

module.exports = { nextISSTimesForMyLocation };