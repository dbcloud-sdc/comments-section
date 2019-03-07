const mongoose = require('mongoose');

const options = {
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
};

mongoose.connect('mongodb://localhost:27017/comments_section', options);

const commentSchema = mongoose.Schema({
  id: Number,
  songId: Number,
  userId: Number,
  postedAt: Number,
  songTime: Number,
  message: String,
}, { collection: 'comments' });

const Comment = mongoose.model('comments', commentSchema);

// PARSE DATA BACK TO CLIENT EXPECTATIONS
module.exports = {
  readComments: songId => Comment.find({ songId })
    .catch(err => console.log(err)),
  // createComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // updateComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // deleteComment: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
  // readCount: songId => db.query(`SELECT * FROM comments where songId = ${songId}`),
};
