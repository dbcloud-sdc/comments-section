const express = require('express');
const path = require('path');
// const db = require('../database/mongodb.js');
const db = require('../database/mariadb.js');


const router = express.Router();

router.get('/:songId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});


router.get('/:songId/comments', async (req, res) => {
  const { songId } = req.params;
  await db.readComments(songId)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.send(400, err);
    });
});

router.post('/:songId/comments', (req, res) => {
  const { songId } = req.params;
  // declare request body variable
  db.createComment(songId, body)
    .then(() => {
      // console.log('posted comment');
      res.send(201);
    })
    .catch((err) => {
      // console.log('failed to post comment');
      res.send(400, err);
    });
});

router.delete('/:songId/comments', (req, res) => {
  const { songId } = req.params;
  db.deleteComment(songId)
    .then((confirmation) => {
      // console.log('deleted comment');
      res.send(204, confirmation);
    })
    .catch((err) => {
      // console.log('failed to delete comment');
      res.send(400, err);
    });
});

router.patch('/:songId/comments', (req, res) => {
  const { songId } = req.params;
  // declare request body variable
  db.updateComment(songId, body)
    .then((confirmation) => {
      // console.log('updated comment');
      res.send(204, confirmation);
    })
    .catch((err) => {
      // console.log('failed to update comment');
      res.send(400, err);
    });
});

router.get('/:songId/commentCount', (req, res) => {
  const { songId } = req.params;
  db.readCount(songId)
    .then((data) => {
      // console.log('got comment count');
      res.send(200, { count: data[0]['COUNT(*)'] });
    })
    .catch((err) => {
      // console.log("didn't get count");
      res.send(400, err);
    });
});

module.exports = router;
