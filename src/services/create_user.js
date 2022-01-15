const prompt = require("prompt");
const db = require("../config/db");
const admin = require("./admin");
const { hashPassword } = require("./admin");

const properties = [
  {
    name: "username",
    validator: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
    warning:
      "Username must be only letters, dashes and must be between 8 and 30 characters",
  },
  {
    name: "password",
    hidden: true,
  },
];

prompt.start();

const onErr = (err) => {
  console.log(`An error occurred!\n`, err);
};

// Function to create user
const insertRow = (username, password) => {
  db.query("INSERT INTO auth(username,password) VALUES($1,$2)", [
    username,
    password,
  ])
    .then((res) => {
      console.log(`Successfully created new user ${username}!`);
    })
    .catch((err) => {
      onErr(err);
    });
};

// Function to prompt user for username and password and insert into DB if username is unique
const createUser = () => {
  prompt.get(properties, (err, result) => {
    if (err) return onErr(err);
    const res = admin
      .checkUser(result.username)
      .then((res) => {
        if (!res) {
          const password = hashPassword(result.password).then(
            (hashedPassword) => {
              insertRow(result.username, hashedPassword);
            }
          );
        } else {
          onErr("Username is taken\nTry another username!");
          createUser();
        }
      })
      .catch((err) => {
        return onErr(err);
      });
  });
};

createUser();
