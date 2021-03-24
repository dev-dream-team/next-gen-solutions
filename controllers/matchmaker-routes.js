const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/helpers/auth");

//TODO: temp mock; replace w/ the actual db query
const users = [
  {
    username: "Yulduz",
    interest: "biking",
    profile_url: "https://picsum.photos/id/237/200/300",
  },
  {
    username: "Test",
    interest: "hiking",
    profile_url: "https://res.cloudinary.com/hvredgn3u/image/upload/v1616485822/ol0bkvjmef2zo9ob8yhy.png",
  },
];

// When withAuth() calls next(), it will call the next (anonymous) function.
// However, if withAuth() calls res.redirect(),
// there is no need for the next function to be called,
// because the response has already been sent.
// router.get("/upload-img", withAuth, (req, res) => {
router.get("/view", (req, res) => {
  res.render("matchmaker", { users });
});

module.exports = router;
