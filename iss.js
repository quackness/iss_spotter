/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response && response.statusCode !== 200) {
      console.log(response.statusCode);
      callback(
        Error(`Status code ${response.statusCode} when fetching IP: ${body}`),
        null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) { //two arguments: ip (string) and callback
  request(`https://api.freegeoip.app/json/8.8.8.8?apikey=daeaa860-95c0-11ec-95f3-9f8a79d1dfa9`,
  //request(`https://freegeoip.app/json/invalidIPHere`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching Coordinates 
      for IP: ${body}`), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);
      return callback(null, { latitude, longitude });
    }
  );
};


 
module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};





