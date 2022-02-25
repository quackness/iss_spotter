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
  request(`https://api.freegeoip.app/json/${ip}?apikey=daeaa860-95c0-11ec-95f3-9f8a79d1dfa9`,
  
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates 
      for IP: ${body}`), null);
      }
      const { latitude, longitude } = JSON.parse(body);
      return callback(null, { latitude, longitude });
    }
  );
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    return callback(null, passes);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};





