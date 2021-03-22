const seedInterests = require("./interest-seeds");
const seedUsers = require('./user-seeds')
const seedUserInterests = require("./user-interests-seeds");
const seedUserProfiles = require('./user-profile-seeds')

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- Interests SEEDED -----\n");

  await seedUserProfiles();
  console.log("\n----- Interests SEEDED -----\n");

  await seedInterests();
  console.log("\n----- Interests SEEDED -----\n");

  await seedUserInterests();
  console.log("\n----- Interests SEEDED -----\n");

  process.exit(0);
};

seedAll();
