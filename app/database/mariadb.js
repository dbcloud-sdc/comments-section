// const mariadb = require('mariadb');
const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('../../config.js');

const connection = mysql.createConnection(config);
// const readFields = 'comments.id, comments.postedAt, comments.songTime,
// comments.message, users.username, users.followers';

connection.queryAsync = bluebird.promisify(connection.query).bind(connection);

module.exports = {
  readComments: songId => connection.queryAsync({
    rowsAsArray: false,
    sql: `SELECT * FROM comments
                WHERE songId = ${songId}`,
  }).catch((err) => {
    if (err.fatal) {
      console.log(err);
    }
  }),

  createComments: songId => connection
    .then(conn => conn.query({
      rowsAsArray: false,
      sql: `SELECT * FROM comments
      WHERE songId = ${songId}`,
    }))
    .catch(err => console.log(err)),
  // createComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // updateComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // deleteComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // readCount: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
};
