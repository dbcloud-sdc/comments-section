const maria = require('../database/mariadb.js');
const mongo = require('../database/mongodb.js');

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
  let filesPerSec = 300;
  let tests = 0;

  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readMongo(filesPerSec);
    const time = (Date.now() - start) / 1000;
    console.log(`${filesPerSec} reads in ${time} seconds : ${results} errors`);
    if (time > 1) {
      filesPerSec -= 10;
    } else if (time < 1) {
      filesPerSec += 10;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  console.log(`Average time was ${total / tests} seconds`);

  testing = true;
  filesPerSec = 100;
  tests = 0;
  total = 0;


  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readMaria(filesPerSec);
    const time = (Date.now() - start) / 1000;
    console.log(`${filesPerSec} reads in ${time} seconds : ${results} errors`);
    if (time > 1) {
      filesPerSec -= 10;
    } else if (time < 1) {
      filesPerSec += 10;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  console.log(`Average time was ${total / tests} seconds`);

  process.exit();
}

elasticTest(60);
