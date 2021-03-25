const sequelize = require("../config/connection");
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, UserProfile, Interest } = require("../models");

router.get("/", withAuth, (req, res) => {
  let userData, interestIds, suggestedUserIds, suggestedUserProfiles;
  const userId = req.session.user_id;

  // returns user profile for a given user
  UserProfile.findOne({
    where: {
      user_id: userId,
    },
    include: [  
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Interest,
        attributes: ["id", "interest_name"],
        as: "user_interests",
      },
    ],
  })
    .then((dbUserData) => {
      userData = dbUserData.get({ plain: true });
      if (!userData) {
        res.status(404).json({
          message: "No profile found with this id",
        });
        return;
      }
      interestIds = userData.user_interests.map((interest) => interest.id);

      // returns user ids of users who share given user's interests
      sequelize
        .query(
          `
            select DISTINCT 
            user_profile.user_id
            from user_profile
            INNER join user_interest
            ON user_profile.user_id = user_profile_id 
            WHERE user_interest.interest_id in (${interestIds})
            AND NOT user_profile_id = ${userId}
            `
          // AND NOT user_profile_id = ${userId}
        )
        .then(([suggestedUsers]) => {
          suggestedUserIds = suggestedUsers.map((user) => user.user_id);
          console.log(suggestedUserIds);

          // returns user profiles of users who share given user's interests
          UserProfile.findAll({
            where: {
              user_id: suggestedUserIds,
            },
            include: [
              {
                model: User,
                attributes: ["username"],
              },
              {
                model: Interest,
                attributes: ["id", "interest_name"],
                as: "user_interests",
              },
            ],
          }).then((dbUserData) => {
            suggestedUserProfiles = dbUserData.map((profile) =>
              profile.get({ plain: true })
            );
            res.render("dashboard", { userData, suggestedUserProfiles, loggedIn:true });
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/search", (req, res) => {
  // handle req.body, if user doesnt select interest, age, gender, or lang
  // req.body = {interests: "", age: 1, gender: "", lang: ""}
  const { interest, age, gender } = req.query;

  sequelize
    .query(
      `
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
    AND user_profile.age = '${age}'
    AND user_profile.gender = '${gender}'
    `
    )
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
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", (req, res) => {
  User.findByPk(req.params.id, {
    attributes: ["id", "username", "email"],
    include: [
      {
        model: UserProfile,
        attributes: ["id", "age", "user_id", "gender", "bio"],
      },
      {
        model: UserInterests,
        attributes: ["id", "interest_id", "user_id"],
      },
    ],
  })
    .then((dbUserData) => {
      if (dbUserData) {
        const user = dbUserData.get({ plain: true });

        res.render("PAGENAME", {
          user,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
