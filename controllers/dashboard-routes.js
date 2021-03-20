const sequelize = require('../config/connection');
const { User, Bio, Interests } = require('../models');
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
                model: Bio,
                // 
                attributes: ['id', 'title', 'user_id']
            },
            {
                model: Interests,
                attributes: ['id', 'title', 'user_id']
            }
        ]
    })
        .then(dbUserData => {
            //serialize data before passing to template
            const users = dbUserData.map(user => user.get({ plain: true }));
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
                model: Bio,
                // 
                attributes: ['id', 'title', 'user_id']
            },
            {
                model: Interests,
                attributes: ['id', 'title', 'user_id']
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