module.exports = function (app) {
  app.get("/verify/:jwt", (req, res) => {
    console.log(req.params.jwt);
    res.redirect("/admin");
  });
};
