const verify = require("../services/verify");

module.exports = function (app, parser) {
  app.get("/verify/:jwt", (req, res) => {
    // console.log(req.params.jwt);
    const valid = verify.verifyToken(req.params.jwt);
    if (valid.value === true) {
      const id = valid.decoded.data;
      console.log(id);
      res.render("verify");
    } else {
      res.send("ERROR!");
    }
  });

  app.post("/verify/:jwt", parser, (req, res) => {
    const valid = verify.verifyToken(req.params.jwt);
    if (valid.value === true) {
      const id = valid.decoded.data;
      const pwd = req.body.pwd;
      let verified = false;
      if (id === pwd) {
        verified = true;
      }
      res.render("verify", {
        verified: verified,
        msg: "CANNOT VERIFY!",
      });
      console.log("id");
    }
  });
};
