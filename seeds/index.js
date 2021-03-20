const seedInterests = require("./interest-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedInterests();
  console.log("\n----- Interests SEEDED -----\n");

  process.exit(0);
};

seedAll();
