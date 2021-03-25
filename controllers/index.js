const router = require("express").Router();

// Collects the packaged group of API and public endpoints,
// then prefixes them with the path
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const userProfileRoutes = require("./user-profile-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/profile", userProfileRoutes);
router.use("/dashboard", dashboardRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wrong route!" }).end();
});

module.exports = router;
