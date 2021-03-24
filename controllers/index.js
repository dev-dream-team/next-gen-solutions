const router = require("express").Router();
const registrationRoutes = require("./registration-routes");
const matchmakerRoutes = require("./matchmaker-routes");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/registration", registrationRoutes);
router.use("/suggestions", matchmakerRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wront route!" }).end();
});

module.exports = router;