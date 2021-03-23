const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/helpers/auth");

// When withAuth() calls next(), it will call the next (anonymous) function.
// However, if withAuth() calls res.redirect(),
// there is no need for the next function to be called,
// because the response has already been sent.
// router.get("/upload-img", withAuth, (req, res) => {
  router.get("/upload-img", (req, res) => {
  res.render("upload-img");
});

module.exports = router;
