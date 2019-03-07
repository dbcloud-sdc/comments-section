const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const morgan = require('morgan');
const compress = require('compression');
const router = require('./app/controllers/router.js');

const port = 3000;
const app = express();
app.use(cors());
app.use(compress());
// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(/bundle/, (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/bundle.js'));
});
app.use('/song', router);
app.use('*', (req, res) => {
  res.redirect('/song/1212039');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
