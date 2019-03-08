// separated from router.js

const redis = require('redis');

const client = redis.createClient();

// const setAsync = bluebird.promisify(client.hset).bind(client);
// const setexAsync = bluebird.promisify(client.setex).bind(client);

module.exports = {
  retrieve(songId) {
    return new Promise((resolve, reject) => {
      client.get(songId, (err, data) => {
        // console.log(err, data);
        if (data === null) {
          reject();
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },
  cache(songId, data) {
    return new Promise((resolve, reject) => {
      console.log(songId, data);
      client.setex(songId, 10000, JSON.stringify(data), (err, response) => {
        if (response === 'undefined') {
          console.log(err);
          reject();
        } else {
          resolve(response);
        }
      });
    });
  },
};
