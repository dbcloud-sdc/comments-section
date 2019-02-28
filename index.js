const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const compress = require('compression');
const router = require('./app/routers/router.js');

const port = 3000;
const app = express();
app.use(cors());
app.use(compress());
app.use(morgan('tiny'));
// necessary?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/scripts', express.static(path.resolve(__dirname, '/node_modules')));
// app.use(express.static(path.resolve(__dirname, '/dist')));
app.get(/bundle/, (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/bundle.js'));
});
app.use('/song', router);
app.use('*', (req, res) => {
  res.redirect('/song/12');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
