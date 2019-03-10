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

  createComments: songId => pool
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

// implement streams
