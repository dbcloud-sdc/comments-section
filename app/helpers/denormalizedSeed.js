const faker = require('faker');
const fs = require('fs');
const stream = require('stream');

const randomNum = num => Math.ceil(Math.random() * num);

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
  return `${lorem[randomNum(lorem.length) - 1]} ${lorem[randomNum(lorem.length) - 1]}`;
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
      // this.push('id\tsongId\tsongTime\tfollowers\tusername\tpostedAt\tmessage\n');
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
      const percentile = `${progress * 2}% complete`;
      let progressBar = '[';
      for (let i = 0; i < progress; i++) {
        progressBar += '▉';
      }
      for (let k = 0; k < (50 - progress); k++) {
        progressBar += ' ';
      }
      progressBar += ']';
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      process.stdout.write(`${progressBar}  ${percentile}`);
      if (progress === 50) {
        const report = new Date() - this.startAt;
        console.log(`\n\nfinished in ${report / 1000} seconds\n`);
      }
    }
  }

  generateComment() {
    let string = `${this.count}\t`;
    string += `${randomNum(1e7)}\t`;
    string += `${randomNum(480) + 119}\t`;
    string += `${randomNum(1e4)}\t`;
    string += `${faker.internet.userName()}\t`;
    string += `${Math.floor(randomNum(this.startAt - 1.57e10) / 6e4)}\t`;
    string += `${randomComment()}\n`;
    return string;
  }
}

async function seedCommentsToCSV() {
  const rs = new CommentsStream();
  rs.pipe(fs.createWriteStream('./comments.tsv'));
}

seedCommentsToCSV();
