
module.exports = {
  database: process.env.db || null,
  host: process.env.dburl || null,
  port: '3306',
  user: process.env.dbuser || 'root',
  password: process.env.dbpw || null,
  connectionLimit: 10,
  connectTimeout: 500,
};
