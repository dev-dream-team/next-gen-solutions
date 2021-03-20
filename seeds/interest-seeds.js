const { Interest } = require("../models");

const interestData = [
  {
    interest_name: "biking",
  },
  {
    interest_name: "hiking",
  },
  {
    interest_name: "cooking",
  },
  {
    interest_name: "photo",
  },
  {
    interest_name: "none",
  },
  {
    interest_name: "dancing",
  },
  {
    interest_name: "music",
  },
  {
    interest_name: "blogging",
  },
  {
    interest_name: "entrepreneurship",
  },
  {
    interest_name: "mentoring",
  },
  {
    interest_name: "sports",
  },
  {
    interest_name: "running",
  },
  {
    interest_name: "pop culture",
  },
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
