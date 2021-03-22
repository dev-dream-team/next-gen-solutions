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

// UserProfile.hasMany(Interest, {
//   as: "interests",
//   foreignKey: "user_profile_id",
// });

// Interest.belongsToMany(UserProfile, {
//   through:  UserInterest,
//   as: "user_profiles",
//   foreignKey: "interest_id",
// });

//has to be commented out or seeding wont work
UserProfile.belongsToMany(Interest, {
  through: UserInterest,
  as: "user_interests",
  foreignKey: "user_profile_id",
});

//has to be commented out or seeding wont work
Interest.belongsToMany(UserProfile, {
  through: UserInterest,
  as: "user_profile",
  foreignKey: "interest_id",
});

module.exports = {
  User,
  UserProfile,
  Interest,
  UserInterest,
};
