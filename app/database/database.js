const connection = require('../../config.js');

module.exports = {
  readComments: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
  // postComment: () => 'tbd',
  // updateComment: () => 'tbd',
  // deleteComment: () => 'tbd',
  readCount: songId => connection.query(`SELECT * FROM comments where songId = ${songId}`),
};
