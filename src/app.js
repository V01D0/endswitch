const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const session = require("express-session");

// Create express app
const app = express();

const hour = 3600000;

// Express session stuff
const sess = {
  secret: "process.env.SECRET",
  cookie: {
    expiry: new Date(Date.now() + hour),
    maxAge: hour,
  },
  resave: false,
  saveUninitialized: true,
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

// Set public, views path
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// Set view engine to hbs
app.set("view engine", "hbs");

// Point express to viewsDir
app.set("views", viewsDir);

// Allow handlebars to see session variables
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// Set express to use JSON parser and URL-Encoded parser
// Leaving JSON bit IF I plan on doing API support
// app.use(bodyParser.json());
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// Register partials with hbs
hbs.registerPartials(partialsDir);

// Point express to publicDir to serve public files from
app.use(express.static(publicDir));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// All routes here
require("./routes")(app, urlEncodedParser, session);
