const { UserInterest } = require("../models");

const userInterestData = [
  {
    id: 1,
    user_profile_id: 1,
    interest_id: 2,
  },
  {
    id: 2,
    user_profile_id: 2,
    interest_id: 6,
  },
  {
    id: 3,
    user_profile_id: 3,
    interest_id: 4,
  },
];

const seedUserInterests = () => UserInterest.bulkCreate(userInterestData);

module.exports = seedUserInterests;
