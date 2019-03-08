const redis = require('redis');

const client = redis.createClient();

module.exports = {
  retrieve(songId) {
    return new Promise((resolve, reject) => {
      client.get(songId, (err, data) => {
        if (data === null || err) {
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
