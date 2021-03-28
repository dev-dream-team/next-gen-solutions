const sequelize = require("../config/connection");
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, UserProfile, Interest } = require("../models");
const { compareSync } = require("bcrypt");

router.get("/", (req, res) => {
  // res.render("dashboard", { interest_name, loggedIn: true });
  res.render("dashboard-search");
});

router.post("/search-results-views", (req, res) => {
  // console.log("hello")
  // const users = req.body;
  res.render("search-results");
});

// put back  on both
// router.get("/", withAuth, (req, res) => {
router.get("/search-results", (req, res) => {
  // handle req.body, if user doesnt select interest, age, gender, or lang
  // req.body = {interests: "", age: 1, gender: "", lang: ""}
  // add back age
  const { interest: interest, gender: gender } = req.query;

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
    `, 
    {
      model: User
    }
      // add age above     AND user_profile.age = '${age}'
      //         
    )
    .then((dbUserData) => {
      //serialize data before passing to template
      // filter here to get users with (interests, age, gender)
      console.log(dbUserData);
      const users = dbUserData.map((user) => {
        return user.get({ raw: true })
      });
      console.log({users})
      var obj = {users: users, loggedIn: true}
      res.render("search-results", obj)
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
