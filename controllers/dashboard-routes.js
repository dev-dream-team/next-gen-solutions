const sequelize = require('../config/connection');
const { User, UserProfile, Interests, UserInterests } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    // handle req.body, if user doesnt select interest, age, gender, or lang
    // req.body = {interests: "", age: 1, gender: "", lang: ""}
    const { interests, age, gender, lang } = req.body;

    User.findAll({
        where: {
            id: {
                [sequelize.Op.not]: req.session.user_id
            }
        },
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
            //serialize data before passing to template
            // filter here to get users with (interests, age, gender, lang)
            const users = dbUserData.map(user => {
                // algorithm/ function() to handle filtering to return array of users
                user.get({ plain: true });
            });
            res.render('dashboard', { users, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
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