const connection = require('../../config.js');

module.exports = {
  readComments: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
  createComment: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
  updateComment: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
  deleteComment: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
  readCount: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
};

/*
SELECT * FROM comments
INTO OUTFILE '/Users/diablo/Documents/test/mysql/test.csv';
*/
