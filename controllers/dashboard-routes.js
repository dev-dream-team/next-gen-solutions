const sequelize = require('../config/connection');
const { User, UserProfile, Interest, UserInterest } = require('../models');
const router = require("express").Router();
// const withAuth = require('../utils/auth');

// put back withAuth on both
router.get('/', (req, res) => {
    // handle req.body, if user doesnt select interest, age, gender, or lang
    // req.body = {interests: "", age: 1, gender: "", lang: ""}
    const { interest, age, gender } = req.query;

    sequelize.query(`
    SELECT 
        user.username as username, 
        user_profile.age as age,
        user_profile.bio as bio,
        user_profile.gender as gender,
        interest.interest_name as interest
    FROM user 
    JOIN user_profile ON user_profile.user_id = user.id
    JOIN user_interest ON user_interest.user_profile_id = user_profile.id
    JOIN interest ON interest.id = user_interest.interest_id
    WHERE interest.interest_name = '${interest}'
    AND user_profile.age = ${age}
    AND user_profile.gender = '${gender}'
    `)
    .then(([dbUserData]) => {
        //serialize data before passing to template
        // filter here to get users with (interests, age, gender)
        // const users = dbUserData.map(user => {
        //     // algorithm/ function() to handle filtering to return array of users
        //     user.get({ plain: true });
        // });
        // res.render('dashboard', { users, loggedIn: true });
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', (req, res) => {
    User.findByPk(req.params.id, {
        attributes: [
            'id',
            'username',
            'email'
        ],
        include: [
            {
                model: UserProfile,
                attributes: ['id', 'age', 'user_id', 'gender', 'bio']
            },
            {
                model: UserInterests,
                attributes: ['id', 'interest_id', 'user_id']
            }
        ]
    })
        .then(dbUserData => {
            if(dbUserData) {
                const user = dbUserData.get({ plain: true });

                res.render('PAGENAME', {
                    user,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;