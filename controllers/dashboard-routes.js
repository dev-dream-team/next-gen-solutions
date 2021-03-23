const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserInterest , UserProfile, User, Interest} = require('../models');
const withAuth = require('../utils/auth');

// get all interests for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'username'
    ],
    include: [
      {
        model: Interest,
        attributes: ['id', 'interest_name'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { interest_name, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;