const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('../../config.js');

const pool = mysql.createPool(config);
pool.query = bluebird.promisify(pool.query);

module.exports = {
  async readComments(songId) {
    const validatedId = Number.parseInt(songId, 10);
    try {
      const result = await pool.query({
        rowsAsArray: false,
        sql: `SELECT id, songTime, followers, username, postedAt, message FROM comments
            WHERE songId = ${validatedId}`,
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  createComment: (songId, {
    songTime, followers, username, postedAt, message,
  }) => {
    // validate params
    let validate;
    return pool.queryAsync({
      rowsAsArray: false,
      sql: `INSERT INTO comments (songId, songTime, followers, username, postedAt, message)
      VALUES (?, ?, ?, ?, ?, ?)`,
      values: [songId, songTime, followers, username, postedAt, message],
    })
      .catch(err => console.log(err));
  },

  // updateComment: songId => pool
  //   .then(conn => conn.query({
  //     rowsAsArray: false,
  //     sql: `'DELETE FROM comments WHERE title = "wrong"'
  //     WHERE songId = ${songId}`,
  //   }))
  //   .catch(err => console.log(err)),

  deleteComment: (commentId) => {
    let validate;
    return pool.queryAsync({
      rowsAsArray: false,
      sql: `DELETE FROM comments
      WHERE id = ${commentId}`,
    })
      .catch(err => console.log(err));
  },
  // readCount: songId => db.query(`SELECT * FROM comments where songId = ${songId}`)
};

// implement streams
