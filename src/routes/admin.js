module.exports = function (app, parser) {
  app.get("/admin", (req, res) => {
    const session = req.session;
    res.render("admin", {
      title: "Endsw!tch admin panel",
    });
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
};
