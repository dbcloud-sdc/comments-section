/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
const axios = require('axios');

const randomFloat = n => Math.random() * n;

const powerCurve = (max) => {
  const range = Math.log(max);
  const power = randomFloat(range);
  return max - Math.floor(Math.exp(power));
};

async function readComments(n) {
  let errors = 0;
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(
      axios.get(`http://localhost:3000/song/${powerCurve(1e7)}/comments`)
        // .then(data => console.log(data)
        .catch(() => {
          errors += 1;
        }),
    );
  }
  return Promise.all(promises)
    .then(() => errors)
    .catch(err => console.log(err));
}

async function elasticTest(totalTests) {
  let testing = true;
  let filesPerSec = 500;
  let tests = 0;
  let totalTime = 0;
  let totalErrors = 0;
  let totalReads = 0;

  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readComments(filesPerSec);
    const time = (Date.now() - start) / 1000;
    totalTime += time;
    totalErrors += results;
    totalReads += filesPerSec - results;
    console.log(`${filesPerSec} reads in ${time} seconds : ${results} errors`);
    if (time > 1) {
      filesPerSec -= 50;
    } else if (time < 1) {
      filesPerSec += 5;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  console.log('---------------------------------------------------------------');
  console.log(`${totalReads} reads in ${totalTime} seconds : ${totalErrors} errors`);
  process.exit();
}

elasticTest(100);
