const mariadb = require('mariadb');
const config = require('../../config.js');

const connection = mariadb.createConnection(config);
// PARSE DATA BACK TO CLIENT EXPECTATIONS

const readFields = 'comments.id, comments.postedAt, comments.songTime, comments.message, users.username, users.followers';

module.exports = {
  readComments: songId => connection
    .then(conn => conn.query({
      rowsAsArray: false,
      sql: `SELECT * FROM (comments, users)
              WHERE songId = ${songId}
              AND users.id = comments.userId`,
    }))
    .catch(err => console.log(err)),

  createComments: songId => connection
    .then(conn => conn.query({
      rowsAsArray: false,
      sql: `SELECT ${readFields} FROM (comments, users)
        WHERE songId = ${songId}
        AND users.id = comments.userId`,
    }))
    .catch(err => console.log(err)),
  // createComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // updateComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // deleteComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // readCount: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
};
