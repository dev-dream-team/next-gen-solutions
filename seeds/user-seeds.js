const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'emily',
        email: 'emily@yahoo.com',
        password: 'password'
    },
    {
        id: 2,
        username: 'archana',
        email: 'archana@yahoo.com',
        password: 'password'
    },
    {
        id: 3,
        username: 'yulduz',
        email: 'yulduz@yahoo.com',
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;