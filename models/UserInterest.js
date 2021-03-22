const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create UserInterest model
class UserInterest extends Model {}

// define table columns and configuration
UserInterest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_profile_id: {
      type: DataTypes.INTEGER,
      // commented out becasue it breaks seeding? 
      // references: {
      //   model: "user_profile",
      //   key: "id",
      // },
    },
    interest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "interest",
        key: "id",
      },
    },
  },
  {
    // TABLE CONFIGURATION OPTIONS
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    // in Sequelize, columns are camelcase by default.
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user_interest",
  }
);
module.exports = UserInterest;
