const withAuth = require("../utils/auth");

const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Interest } = require("../models");

router.get("/questionnaire", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["username", "id"],
  }).then((dbUserProfileData) => {
    if (!dbUserProfileData) {
      res.status(400).json({
        message: "No username found under this id",
      });
      return;
    }
    const user = dbUserProfileData.get({ plain: true });
    res.render("questionnaire", { user, loggedIn: true });
  });
});

// router.get("/", withAuth, (req, res) => {
router.get("/more-info", (req, res) => {
  let interests, user;
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["username", "id"],
  }).then((dbUserProfileData) => {
    if (!dbUserProfileData) {
      res.status(400).json({
        message: "No username found under this id",
      });
      return;
    }
    Interest.findAll({
      attributes: ["id", "interest_name"],
    }).then((dbInterests) => {
      interests = dbInterests.map((profile) => profile.get({ plain: true }));
      console.log(interests);
      user = dbUserProfileData.get({ plain: true });
      res.render("more-info", { user, interests, loggedIn: true });
    });
  });
});

module.exports = router;
