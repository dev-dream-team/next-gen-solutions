const User = require("./User");
const UserProfile = require("./UserProfile");
const Interest = require("./Interest");
const UserInterest = require("./UserInterest");

// create associations
User.hasOne(UserProfile, {
  foreignKey: "user_id",
});

UserProfile.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

UserProfile.belongsToMany(Interest, {
  through: UserInterest,
  as: "interests",
  foreignKey: "user_profile_id",
});

Interest.belongsToMany(UserProfile, {
  through: UserInterest,
  as: "interest",
  foreignKey: "interest_id",
});

module.exports = {
  User,
  UserProfile,
  Interest,
  UserInterest,
};
