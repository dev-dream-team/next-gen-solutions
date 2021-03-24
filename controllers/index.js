const router = require("express").Router();
// <<<<<<< HEAD
// const registrationRoutes = require("./registration-routes");
// const matchmakerRoutes = require("./matchmaker-routes");
// const apiRoutes = require("./api");

// router.use("/api", apiRoutes);
// router.use("/registration", registrationRoutes);
// router.use("/suggestions", matchmakerRoutes);
// =======

// Collects the packaged group of API endpoints and prefixing them with the path /api
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const userProfileRoutes = require("./user-profile-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/profile", userProfileRoutes);
router.use("/dashboard", dashboardRoutes);
// >>>>>>> main

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wrong route!" }).end();
});

module.exports = router;