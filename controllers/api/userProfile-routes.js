const router = require("express").Router();
const { User, UserProfile, Interest, UserInterest } = require("../../models");

module.exports = router;

// GET /api/userProfile
router.get("/", (req, res) => {
  UserProfile.findAll({
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
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  UserProfile.findOne({
    where: {
      id: req.params.id,
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
      if (!dbUserData) {
        res.status(404).json({
          message: "No profile found with this id",
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE /api/userProfile
router.put("/:id", (req, res) => {
  UserProfile.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "No user profile found with this id" });
      return;
    }
    UserProfile.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((dbUserProfileData) => {
        if (!req.body.interestIds) {
          return res.status(200).json(dbUserProfileData);
        } else if (req.body.interestIds) {
          // find all associated interests from UserInterest table
          return UserInterest.findAll({
            where: { user_profile_id: req.params.id },
          }).then((userInterests) => {
            if (userInterests) {
              // get list of current user interests
              const userInterestsIds = userInterests.map(
                ({ interest_id }) => interest_id
              );
              // create filtered list of new interest_ids
              const newInterestIds = req.body.interestIds
                .filter(
                  (interest_id) => !userInterestsIds.includes(interest_id)
                )
                .map((interest_id) => {
                  return {
                    user_profile_id: req.params.id,
                    interest_id,
                  };
                });

              // figure out which ones to remove
              const userInterestsToRemove = userInterests
                .filter(
                  ({ interest_id }) =>
                    !req.body.interestIds.includes(interest_id)
                )
                .map(({ id }) => id);

              // run both actions
              // return Promise.all([
              UserInterest.destroy({ where: { id: userInterestsToRemove } });
              return (
                UserInterest.bulkCreate(newInterestIds)
                  // ])
                  .then((updatedProductTags) =>
                    res.status(200).json(updatedProductTags)
                  )
              );
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});