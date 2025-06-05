'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User);
    }
  }
  UserProfile.init({
    profilePicUrl: DataTypes.STRING,
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'About me cannot be Null'
        },
        notEmpty: {
          msg: 'About me cannot be empty'
        }
      }
    },
    sumGraduate: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};