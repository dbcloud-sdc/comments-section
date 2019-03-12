const express = require('express');
const path = require('path');
const db = require('../models/mariadb.js');

const router = express.Router();

router.get('/:songId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

router.route('/:songId/comments')
  .get((req, res) => {
    const { songId } = req.params;
    db.readComments(songId)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    const { songId } = req.params;
    const { body } = req;
    db.createComment(songId, body)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.send(500, err);
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


/* version with no expiration updating
router.get('/:songId/comments', (req, res) => {
  const { songId } = req.params;
  retrieve(songId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => db.readComments(songId)
      .then((data) => {
        cache(songId, data)
          .then(() => {
            res.status(200).send(data[0]);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      }));
});
*/
