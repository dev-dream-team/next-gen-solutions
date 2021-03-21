const { UserProfile } = require('../models');

const userProfileData = [
    {
        id: 1,
        user_id: 1,
        age: 24,
        bio: 'Hi!',
        gender: 'female'
    }
];

const seedUserProfiles = () => UserProfile.bulkCreate(userProfileData);

module.exports = seedUserProfiles;