const moment = require('moment');
const faker = require('faker');
const fs = require('fs');
const stream = require('stream');
const database = require('../../config.js');

const randomNum = num => Math.floor(Math.random() * num);

const getRandomTime = () => {
  const minutesAgo = () => randomNum(144000);
  return moment().subtract(minutesAgo(), 'minutes').format();
};

const randomSongTime = () => {
  const minute = randomNum(5);
  let second = randomNum(59);
  second = second < 10 ? `0${second}` : second;
  return `${minute}:${second}`;
};

const randomComment = () => {
  const lorem = [
    'Lorem ipsum dolor amet street art cillum lo-fi labore wolf pour-over authentic gastropub.',
    'Quis taiyaki eu, fingerstache tilde hella incididunt stumptown irony messenger bag ramps.',
    "Authentic green juice in 90's, vexillologist PBR&B kale chips cold-pressed affogato adaptogen vaporware in ut ennui celiac.",
    "Nulla gluten-free ut you probably haven't heard of them.",
    'Adipisicing food truck gochujang pug irony ullamco anim kitsch locavore fashion axe selvage affogato austin dolore.',
    'Master cleanse squid incididunt pariatur, magna normcore poke lomo aesthetic next level coloring book affogato godard keytar labore.',
    'Aute cupidatat aliqua meditation.',
    'Consectetur umami slow-carb venmo brooklyn.',
    'Four loko quinoa skateboard, raclette proident bushwick intelligentsia sunt elit ugh quis.',
    "Occupy 90's before they sold out cardigan, disrupt sustainable palo santo tbh.",
  ];
  return lorem[randomNum(lorem.length)] + lorem[randomNum(lorem.length)];
};

class CommentsStream extends stream.Readable {
  constructor(opt) {
    super(opt);
    this.limit = 1e8;
    this.count = 0;
    this.cache = '';
    this.progress = null;
    this.startAt = new Date();
  }

  _read() {
    // if count has reached limit, push null
    if (this.count === this.limit) {
      this.push(this.cache);
    } else {
      // loop from count to count + 200;
      const workcount = this.count + 100;
      for (let i = this.count; i < workcount; i += 1) {
        // --> increment count
        this.count += 1;
        // --> push a new user to cache
        this.cache += this.generateUser();
      }
      // this.push cache
      this.push(this.cache);
      // reset cache to '';
      this.cache = '';
      this.progressBar();
    }
  }

  progressBar() {
    const progress = Math.floor(50 * (this.count / this.limit));
    if (progress !== this.progress) {
      this.progress = progress;
      let progressBar = '[';
      for (let i = 0; i < progress; i++) {
        progressBar += '▉';
      }
      for (let k = 0; k < (50 - progress); k++) {
        progressBar += ' ';
      }
      progressBar += ']';
      console.clear();
      console.log(progressBar);
      console.log(`${progress * 2}% complete`);
      if (progress === 50) {
        const report = new Date() - this.startAt;
        console.log(`finished in ${report / 1000} seconds`);
      }
    }
  }

  generateUser() {
    let string = `${this.count},`;
    string += `${faker.internet.userName()},`;
    string += `${randomNum(10000000) + 1},`;
    string += `${faker.lorem.sentence(10, 3)},`;
    string += `${getRandomTime()},`;
    string += `${randomSongTime()},`;
    string += `${randomNum(10000) + 1}\n`;
    return string;
  }
}

class UsersStream extends stream.Readable {
  constructor(opt) {
    super(opt);
    this.limit = 1e7;
    this.count = 0;
    this.cache = '';
    this.startAt = new Date();
    this.progress = null;
  }

  _read() {
    // if count has reached limit, push null
    if (this.count === this.limit) {
      this.push(null);
    } else {
      // loop from count to count + 200;
      const workcount = this.count + 1000;
      for (let i = this.count; i < workcount; i += 1) {
        // --> increment count
        this.count += 1;
        // --> push a new user to cache
        this.cache += this.generateUser();
      }
      // this.push cache
      this.push(this.cache);
      // reset cache to '';
      this.cache = '';
      this.progressBar();
    }
  }

  progressBar() {
    const progress = Math.floor(50 * (this.count / this.limit));
    if (progress !== this.progress) {
      this.progress = progress;
      let progressBar = '[';
      for (let i = 0; i < progress; i++) {
        progressBar += '▉';
      }
      for (let k = 0; k < (50 - progress); k++) {
        progressBar += ' ';
      }
      progressBar += ']';
      console.clear();
      console.log(progressBar);
      console.log(`${progress * 2}% complete`);
      if (progress === 50) {
        const report = new Date() - this.startAt;
        console.log(`finished in ${report / 1000} seconds`);
      }
    }
  }

  generateUser() {
    return `${this.count}, ${faker.internet.userName()}, ${randomNum(1e5) + 1}\n`;
  }
}

async function seedUsersToCSV() {
  await database.schema.dropTableIfExists('users')
    .then(() => database.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('username');
      // table.string('profilePic'); // s3url, belongs in a user table
      table.integer('followers');
    }));
  const now = new Date();
  const ws = fs.createWriteStream('./userdata.csv');
  const rs = new UsersStream();
  rs.pipe(ws);
  ws.on('end', () => {
    process.exit();
  });
}

async function seedCommentsToCSV() {
  await database.schema.dropTableIfExists('comments')
    .then(() => database.schema.createTable('comments', (table) => {
      table.increments('id');
      table.integer('songId');
      table.integer('userId');
      table.string('message');
      table.string('postedAt');
      table.string('songTime');
    }));
  const now = new Date();
  const ws = fs.createWriteStream('./commentsdata.csv');
  const rs = new CommentsStream();
  rs.pipe(ws);
  ws.on('end', () => {
    console.log('celebration');
  });
}

// seedCommentsToCSV();
// seedUsersToCSV();
