// separated from router.js

const redis = require('redis');
const bluebird = require('bluebird');

const client = redis.createClient();
const getAsync = bluebird.promisify(client.get).bind(client);
// const setAsync = bluebird.promisify(client.set).bind(client);
const setexAsync = bluebird.promisify(client.setex).bind(client);

module.exports = {
  retrieve(songId) {
    return getAsync(songId);
  },
  cache() {
    return setexAsync(songId, 60000, JSON.stringify(data));
  },
};
