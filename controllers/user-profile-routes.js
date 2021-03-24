const withAuth = require("../utils/helpers/auth");

const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");

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
router.get("/upload-img", (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["username"],
  }).then((dbUserProfileData) => {
    if (!dbUserProfileData) {
      res.status(400).json({
        message: "No username found under this id",
      });
      return;
    }
    const user = dbUserProfileData.get({ plain: true });
    res.render("upload-img", { user, loggedIn: true });
  });
});

module.exports = router;
