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
            res.render("dashboard", {
              userData,
              suggestedUserProfiles,
              loggedIn: true,
            });
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/search", withAuth, (req, res) => {
  // res.render("dashboard", { interest_name, loggedIn: true });
  res.render("dashboard-search", { loggedIn: true });
});

// router.post("/search-results-views", (req, res) => {
//   // console.log("hello")
//   // const users = req.body;
//   res.render("search-results");
// });

router.get("/search-results", withAuth, (req, res) => {
  // handle req.body, if user doesnt select interest, age, gender, or lang
  // req.body = {interests: "", age: 1, gender: "", lang: ""}
  // add back age
  const { interest: interest, gender: gender } = req.query;
  const userId = req.session.user_id;

  // const interest = req.query.interest;
  // const gender = req.query.gender;

  sequelize
    .query(
      `
    SELECT
        user.username as username,
        user_profile.bio as bio,
        user_profile.age as age,
        user_profile.gender as gender,
        user_profile.phone as phone,
        user_profile.profile_url as photo,
        interest.interest_name as interest
    FROM user
    JOIN user_profile ON user_profile.user_id = user.id
    JOIN user_interest ON user_interest.user_profile_id = user_profile.id
    JOIN interest ON interest.id = user_interest.interest_id
    WHERE interest.interest_name = '${interest}'
    AND user_profile.gender = '${gender}'
    AND NOT user_profile_id = ${userId}
    `,
      {
        model: User,
      }
      // add age above     AND user_profile.age = '${age}'
      //
    )
    .then((dbUserData) => {
      //serialize data before passing to template
      // filter here to get users with (interests, age, gender)
      console.log(dbUserData);
      const users = dbUserData.map((user) => {
        return user.get({ raw: true });
      });
      console.log({ users });
      res.render("search-results", { users, loggedIn: true });
      // res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/:id", (req, res) => {
//   User.findByPk(req.params.id, {
//     attributes: ["id", "username", "email"],
//     include: [
//       {
//         model: UserProfile,
//         attributes: ["id", "age", "user_id", "gender", "bio"],
//       },
//       {
//         model: UserInterest,
//         attributes: ["id", "interest_id", "user_id"],
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       if (dbUserData) {
//         const user = dbUserData.get({ plain: true });

//         res.render("PAGENAME", {
//           user,
//           loggedIn: true,
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
