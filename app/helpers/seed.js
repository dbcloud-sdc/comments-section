const loremIpsum = require('lorem-ipsum');
const moment = require('moment');
const database = require('../../config.js');

const getRandomTime = () => {
  // fixed for 3 month time frame
  const randomNum = () => Math.floor(Math.random() * 144000);
  return moment().subtract(randomNum(), 'minutes').format();
};


database.schema.dropTableIfExists('comments')
  .then(() => database.schema.createTable('comments', (table) => {
    table.increments('id');
    // song id
    table.string('user_id');
    // table.string('profilePic'); // s3url, belongs in a user table
    table.string('message');
    table.string('postedAt'); // refactor
    table.string('songTime');
    table.number('followers'); // refactor, is number a thing?
  }))
  .then(() => {
    // fill with row objects
    const rows = [];
    for (let i = 0; i < 1000; i += 1) {
      const comment = {};
      comment.user_id = null; //
      comment.p = faker.commerce.price();
      comment.avg_review = Math.floor(Math.random() * 40 + 10) / 10;
      comment.review_count = Math.floor(Math.random() * 5000);
      comment.is_prime = faker.random.boolean();
      comment.category = faker.commerce.department();
      comment.manufacturer = faker.company.companyName();
      // product.image = `https://s3-us-west-1.amazonaws.com/amazon-product-carousel-images/products/item-${i + 1}.png`;
      rows.push(comment);
    }
    return database('comments').insert(rows);
  })
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    throw (err);
  });

// const createTable = async () => {
//   await connection.query('DROP TABLE IF EXISTS comments');
//   await connection.query(`CREATE TABLE comments(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     songId INT,
//     profilePic VARCHAR(200),
//     username VARCHAR(200),
//     message VARCHAR(200),
//     postedAt VARCHAR(200),
//     songTime VARCHAR(200),
//     followers VARCHAR(200)
//   )`);
// };

// const randomSongTime = () => {
//   const randomNum = num => Math.floor(Math.random() * num + 1);
//   const minute = randomNum(5);
//   let second = randomNum(59);
//   second = second < 10 ? `0${second}` : second;
//   return `${minute}:${second}`;
// };

// const randomFollowers = () => Math.floor(Math.random() * 10000 + 1);
// const randomNum = () => Math.floor(Math.random() * 99 + 1);
// const createMessage = async (count) => {
//   await connection.query(`
//     INSERT INTO comments(profilePic, songId, username, message, postedAt, songTime, followers)
//     VALUES('https://s3-us-west-1.amazonaws.com/kevin-zoundcloud/imgs/user${randomNum()}.jpg',
//       '${count}',
//       '${loremIpsum({ count: 1, units: 'words' })}',
//       '${loremIpsum()}',
//       '${getRandomTime()}',
//       '${randomSongTime()}',
//       '${randomFollowers()}'
//     )
//   `);
// };

// const createMessages = () => {
//   let count = 0;
//   const message = () => {
//     if (count === 100) {
//       return count;
//     }
//     count += 1;
//     createMessage(count);
//     message();
//   };
//   message();
// };


// module.exports = async () => {
//   await connection.query('DROP DATABASE IF EXISTS ZoundCloud');
//   await connection.query('CREATE DATABASE ZoundCloud');
//   await connection.query('USE ZoundCloud');
//   await createTable();
//   for (let i = 0; i < 50; i++) {
//     createMessages();
//   }
//   await connection.end();
// };
