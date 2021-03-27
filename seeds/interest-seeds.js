const { Interest } = require("../models");

const interestData = [
  {
    interest_name: "biking",
  },
  {
    interest_name: "hiking",
  },
  {
    // id: 3,
    interest_name: "cooking",
  },
  {
    id: 4,
    interest_name: "photography",
  },
  {
    id: 5,
    interest_name: "technology",
  },
  {
    // id: 6,
    interest_name: "dancing",
  },
  {
    // id: 7,
    interest_name: "music",
  },
  {
    // id: 8,
    interest_name: "blogging",
  },
  {
    // id: 9,
    interest_name: "entrepreneurship",
  },
  {
    // id: 10,
    interest_name: "mentoring",
  },
  {
    // id: 11,
    interest_name: "sports",
  },
  {
    // id: 12,
    interest_name: "running",
  },
  {
    // id: 13,
    interest_name: "pop culture",
  },
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
