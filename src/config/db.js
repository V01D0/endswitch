const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.USER,
  port: process.env.PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
