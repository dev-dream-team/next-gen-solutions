const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Post, User, Comment } = require("../models");
// const withAuth = require("../utils/auth");

// When withAuth() calls next(), it will call the next (anonymous) function.
// However, if withAuth() calls res.redirect(),
// there is no need for the next function to be called,
// because the response has already been sent.

// router.get("/", withAuth, (req, res) => {
router.get("/upload-img", (req, res) => {
  // res.render("dashboard", { posts, loggedIn: true });
  res.render("upload-img");
});


module.exports = router;