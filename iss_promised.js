const request = require('request-promise-native');

const fetchMyIP = function(){
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;//parse from ip look up
  return request(`https://api.freegeoip.app/json/${ip}?apikey=daeaa860-95c0-11ec-95f3-9f8a79d1dfa9`)
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request (`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()//I will get you ip
.then(fetchCoordsByIP) //I will get you coords by the ip
.then(fetchISSFlyOverTimes)
.then( body =>  {
  const { response } = JSON.parse(body);
  return response;//data
})
}

module.exports = { nextISSTimesForMyLocation };




