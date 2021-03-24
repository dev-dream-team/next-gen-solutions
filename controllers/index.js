const router = require("express").Router();

// Collects the packaged group of API endpoints and prefixing them with the path /api
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const registrationRoutes = require("./registration-routes.js");

// Main routes of application.
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// Now all dashboard views will be prefixed with /dashboard. In dashboard-routes.js
router.use("/dashboard", dashboardRoutes);

router.use("/registration", registrationRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wrong route!" }).end();
});

module.exports = router;
