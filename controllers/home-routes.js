const sequelize = require("sequelize");
const { Interest } = require("../models");

const router = require("express").Router();

router.get('/', (req, res) => {
    console.log('======================');
    res.render('/');
  });
  
  //This is to render the Login Dashboard
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });