const maria = require('../../app/models/mariadb.js');
const mongo = require('../models/mongodb.js');

const randomNumber = n => Math.ceil(Math.random() * n);

async function readMaria(n) {
  let errors = 0;
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(maria.readComments(randomNumber(1e7))
      .catch(() => {
        errors += 1;
      }));
  }
  return Promise.all(promises)
    .then(() => errors)
    .catch(err => console.log(err));
}

async function readMongo(n) {
  let errors = 0;
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(mongo.readComments(randomNumber(1e7))
      .catch(() => {
        errors += 1;
      }));
  }
  return Promise.all(promises)
    .then(() => errors)
    .catch(err => console.log(err));
}

async function elasticTest(totalTests) {
// testing, hertz, average,
  let testing = true;
  let readsPerSec = 100;
  let tests = 0;
  let total = 0;
  console.log('~~ testing MongoDB ~~');
  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readMongo(readsPerSec);
    const time = (Date.now() - start) / 1000;
    console.log(`${readsPerSec} reads in ${time} seconds : ${results} errors`);
    total += time;
    if (time > 1) {
      readsPerSec -= 5;
    } else if (time < 1) {
      readsPerSec += 5;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  console.log(`Average time was ${total / tests} seconds`);

  testing = true;
  readsPerSec = 100;
  tests = 0;
  total = 0;
  console.log('~~ testing MariaDB ~~');


  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readMaria(readsPerSec);
    const time = (Date.now() - start) / 1000;
    console.log(`${readsPerSec} reads in ${time} seconds : ${results} errors`);
    total += time;
    if (time > 1) {
      readsPerSec -= 10;
    } else if (time < 1) {
      readsPerSec += 10;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  console.log(`Average time was ${total / tests} seconds`);

  process.exit();
}

elasticTest(60);
