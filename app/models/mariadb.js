const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('../../config.js');

const pool = mysql.createPool(config);

pool.queryAsync = bluebird.promisify(pool.query).bind(pool);

module.exports = {
  readComments: songId => pool.queryAsync({
    rowsAsArray: false,
    sql: `SELECT * FROM comments
                WHERE songId = ${songId}`,
  }).catch((err) => {
    if (err.fatal) {
      console.log(err);
    }
  }),

  createComment: commentId => pool
    .then(conn => conn.query({
      rowsAsArray: false,
      sql: `INSERT INTO comments
      SET title = "wrong"`,
    }))
    .catch(err => console.log(err)),

  // updateComment: songId => pool
  //   .then(conn => conn.query({
  //     rowsAsArray: false,
  //     sql: `'DELETE FROM comments WHERE title = "wrong"'
  //     WHERE songId = ${songId}`,
  //   }))
  //   .catch(err => console.log(err)),

  deleteComment: commentId => pool
    .then(conn => conn.query({
      rowsAsArray: false,
      sql: `DELETE FROM comments
      WHERE songId = ${songId}`,
    }))
    .catch(err => console.log(err)),
  // readCount: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
};

// implement streams
