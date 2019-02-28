const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const compress = require('compression');
const { readComments, readCount } = require('./app/controllers/router.js');

const port = 3000;
const app = express();
app.use(cors());
app.use(compress());
// necessary?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/song/:songId', express.static(path.resolve(__dirname, '/dist')));
app.use(express.static(path.resolve(__dirname, '/dist')));

app.get('/song/:songId/comments', readComments);

app.get('/song/:songId/commentCount', readCount);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
