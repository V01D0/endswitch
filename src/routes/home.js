module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("home", {
      title: "Endsw!tch",
    });
  });

  app.get("/logout", (req, response) => {
    if (req.session.userid) {
      req.session.destroy();
    }
    response.redirect("/");
  });
};
