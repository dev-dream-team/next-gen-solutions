const { UserProfile } = require('../models');

const userProfileData = [
    {
        id: 1,
        user_id: 1,
        age: 24,
        bio: 'Hi!',
        gender: 'female',
        phone: '6264872173'
    },
    {
        id: 2,
        user_id: 2,
        age: 42,
        bio: 'Hi!',
        gender: 'female',
        phone: '1234567890'
    },
    {
        id: 3,
        user_id: 3,
        age: 87,
        bio: 'Test bio!',
        gender: 'male',
        phone: '0987654321'
    }
];

const seedUserProfiles = () => UserProfile.bulkCreate(userProfileData);

module.exports = seedUserProfiles;