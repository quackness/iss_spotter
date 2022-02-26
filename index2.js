const { nextISSTimesForMyLocation } = require ('./iss_promised');//Require 

// fetchMyIP()//I will get you ip
// .then(fetchCoordsByIP) //I will get you coords by the ip
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body))//success resolved and I will get you the location
// .catch(error => console.log(error))//failed


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then(data => {
  printPassTimes(data);
});
