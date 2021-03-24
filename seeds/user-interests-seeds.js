const { UserInterest } = require('../models');

const userInterestData = [
    {
        id: 1,
        user_profile_id: 1,
        interest_id: 2
    },
    {
        id: 2,
        user_profile_id: 1,
        interest_id: 6
    }
];

const seedUserInterests = () => UserInterest.bulkCreate(userInterestData);

module.exports = seedUserInterests;