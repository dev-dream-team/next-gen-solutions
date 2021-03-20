const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const userProfileRoutes = require("./userProfile-routes");


router.use("/users", userRoutes);
router.use('/userProfiles', userProfileRoutes)

module.exports = router;
