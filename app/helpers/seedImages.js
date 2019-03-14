const request = require('request');
const fs = require('fs');

const random = n => Math.floor(Math.random() * n);
const aspects = ['320', '360', '420', '480', '540', '600', '640'];
const subjects = ['people', 'arch', 'nature'];

// GETS IMAGES FOR PROFILE PIC
const download = async (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

let count = 1;
const populateFolder = (n) => {
  let url = '';
  if (count < 100) {
    const aspect = aspects[random(aspects.length)];
    const subject = subjects[random(subjects.length)];
    url = `https://placeimg.com/${aspect}/${aspect}/${subject}`;
  } else if (count < 200) {
    url = `https://randomuser.me/api/portraits/men/${count - 100}.jpg`;
  } else {
    url = `https://randomuser.me/api/portraits/women/${count - 200}.jpg`;
  }
  download(url, `../../../Pictures/sdc/user${count}.jpg`, () => {
    console.log(`${count} downloaded`);
    if (count === n) {
      process.exit();
    }
    count += 1;
    populateFolder(n);
  });
};

populateFolder(300);
