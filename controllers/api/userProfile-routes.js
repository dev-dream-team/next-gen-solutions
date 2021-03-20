const router = require("express").Router();
const { User, UserProfile } = require("../../models");
const { route } = require("./user-routes");

module.exports = router;

// GET /api/userProfile
router.get("/", (req, res) => {
  UserProfile.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  UserProfile.findOne({
    where: {
      user_id: req.params.id,
    },
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
  UserProfile.update(req.body, {
    where: {
      user_id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
