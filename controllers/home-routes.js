const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/signup");
    return;
  }
  res.redirect("/dashboard");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;
