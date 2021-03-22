const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create UserProfile model
class UserProfile extends Model {}

// define table columns and configuration
UserProfile.init(
  {
    id: {
      // use the special Sequalize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    age: {
      type: DataTypes.INTEGER,
    },
    bio: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    facebook: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    twitter: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    profile_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
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
    modelName: "user_profile",
  }
);
module.exports = UserProfile;
