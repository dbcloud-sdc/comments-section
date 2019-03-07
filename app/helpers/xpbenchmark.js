const axios = require('axios');

const randomNumber = n => Math.ceil(Math.random() * n);

async function readComments(n) {
  let errors = 0;
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(
      axios.get(`http://localhost:3000/song/${9.5e6 + randomNumber(5e5)}/comments`)
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
  let filesPerSec = 800;
  let tests = 0;

  while (testing) {
    tests += 1;
    const start = Date.now();
    const results = await readComments(filesPerSec);
    const time = (Date.now() - start) / 1000;
    console.log(`${filesPerSec} reads in ${time} seconds : ${results} errors`);
    if (time > 1) {
      filesPerSec -= 5;
    } else if (time < 1) {
      filesPerSec += 5;
    }
    if (tests === totalTests) {
      testing = false;
    }
  }
  process.exit();
}

elasticTest(50);
