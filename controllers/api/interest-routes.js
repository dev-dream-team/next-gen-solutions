const router = require("express").Router();
const { Interest, UserProfile } = require("../../models");

// GET /api/interests
router.get("/", (req, res) => {
  Interest.findAll()
    .then((dbInterestData) => res.json(dbInterestData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  Interest.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: UserProfile,
        attributes: ["id", "user_id"],
        as: "user_profile",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          message: "No user found with this id",
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

module.exports = router;
