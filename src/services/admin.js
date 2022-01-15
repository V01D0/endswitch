const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Function to check the existence of a user(name)
const checkUser = (username) => {
  const exists = db
    .query("SELECT password FROM auth WHERE username = $1", [username])
    .then((res) => {
      if (res.rowCount === 0) return false;
      return res;
    });
  return exists;
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const isValid = (password, hash) => {
  const res = bcrypt
    .compare(password, hash)
    .then((res) => res)
    .catch((e) => {
      return false;
    });
  return res;
};

module.exports = {
  checkUser: checkUser,
  hashPassword: hashPassword,
  isValid: isValid,
};
