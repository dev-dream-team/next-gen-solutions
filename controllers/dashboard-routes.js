const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserInterest , UserProfile, User, Interest} = require('../models');
const withAuth = require('../utils/auth');

router.get("/dashboard", (req, res) => {
    // res.render("dashboard", { interest_name, loggedIn: true });
    res.render("dashboard");
  });


module.exports = router;