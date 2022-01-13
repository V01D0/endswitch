const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Create express app
const app = express();

// Set public, views path
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// Set view engine to hbs
app.set("view engine", "hbs");

// Point express to viewsDir
app.set("views", viewsDir);

// Register partials with hbs
hbs.registerPartials(partialsDir);

// Point express to publicDir to serve public files from
app.use(express.static(publicDir));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// All routes here
require("./routes")(app);
