const moment = require('moment');
const faker = require('faker');
const fs = require('fs');
const stream = require('stream');
const database = require('../../config.js');

const randomNum = num => Math.floor(Math.random() * num);

// const getRandomTime = () => {
//   const minutesAgo = () => randomNum(144000);
//   return moment().subtract(minutesAgo(), 'minutes').format();
// };

// const randomSongTime = () => {
//   const minute = randomNum(5);
//   let second = randomNum(59);
//   second = second < 10 ? `0${second}` : second;
//   return `${minute}:${second}`;
// };

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
  return `${lorem[randomNum(lorem.length)]} ${lorem[randomNum(lorem.length)]}`;
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
    if (this.count === 0) {
      this.push('id\tsongId\tuserId\tpostedAt\tsongTime\tmessage\n');
    }
    if (this.count === this.limit) {
      this.push(null);
    } else {
      const workcount = this.count + 1000;
      for (let i = this.count; i < workcount; i += 1) {
        this.count += 1;
        this.cache += this.generateComment();
      }
      this.push(this.cache);
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

  generateComment() {
    let string = `${this.count}\t`;
    string += `${randomNum(1e7) + 1}\t`;
    string += `${randomNum(1e7) + 1}\t`;
    string += `${randomNum(259200)}\t`;
    string += `${randomNum(480) + 120}\t`;
    string += `${randomComment()}\n`;
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
    if (this.count === 0) {
      this.push('id\tusername\tfollowers\n');
    }
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
    return `${this.count}\t${faker.internet.userName()}\t${randomNum(1e5) + 1}\n`;
  }
}

async function seedUsersToCSV() {
  // await database.schema.dropTableIfExists('users')
  //   .then(() => database.schema.createTable('users', (table) => {
  //     table.increments('id');
  //     table.string('username');
  //     table.integer('followers');
  //   }));
  const ws = fs.createWriteStream('./users.tsv');
  const rs = new UsersStream();
  rs.pipe(ws);
  ws.on('end', () => {
    process.exit();
  });
}

async function seedCommentsToCSV() {
  // await database.schema.dropTableIfExists('comments')
  //   .then(() => database.schema.createTable('comments', (table) => {
  //     table.increments('id');
  //     table.integer('songId');
  //     table.integer('userId');
  //     table.integer('postedAt');
  //     table.integer('songTime');
  //     table.text('message');
  //   }));
  const ws = fs.createWriteStream('./comments2.tsv');
  const rs = new CommentsStream();
  rs.pipe(ws);
  ws.on('end', () => {
    process.exit();
  });
}

seedCommentsToCSV();
// seedUsersToCSV();
