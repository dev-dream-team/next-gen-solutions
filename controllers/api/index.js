const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const userProfileRoutes = require("./userProfile-routes");
const interestRoutes = require("./interest-routes");

const uploadImgRoutes = require("./upload-routes");

router.use("/users", userRoutes);
router.use("/userProfiles", userProfileRoutes);
router.use("/interests", interestRoutes);

router.use("/upload", uploadImgRoutes);

module.exports = router;
