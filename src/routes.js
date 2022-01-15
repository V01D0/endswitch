const admin = require("./services/admin");
// const { jwt } =
// const { session } = require("./app");

module.exports = function (app, parser) {
  app.get("/", (req, res) => {
    res.render("home", {
      title: "Endsw!tch",
    });
  });

  app.get("/admin", (req, res) => {
    const session = req.session;
    res.render("admin", {
      title: "Endsw!tch admin panel",
    });
  });

  app.get("/verify/:jwt", (req, res) => {
    console.log(req.params.jwt);
    res.redirect("/admin");
  });

  app.post("/admin", parser, (req, response) => {
    const username = req.body.usr;
    const password = req.body.pwd;
    const session = req.session;
    const exists = admin.checkUser(username, password).then((res) => {
      if (res) {
        const hash = res.rows[0].password;
        const auth = admin.isValid(password, hash).then((res) => {
          if (res) {
            const session = req.session;
            session.userid = username;
            console.log(
              `session for user ${username} created\n ${req.session}`
            );
            response.redirect("/admin");
          } else {
            session.err = "error: Invalid username or password";
            response.redirect("/admin");
          }
        });
      } else {
        session.err = "error: Invalid username or password";
        response.redirect("/admin");
      }
    });
  });

  app.get("/logout", (req, response) => {
    if (req.session.userid) {
      req.session.destroy();
    }
    response.redirect("/");
  });
};
