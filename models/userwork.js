'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWork extends Model {
    static associate(models) {
      UserWork.belongsTo(models.User);
      UserWork.belongsTo(models.Challenge);
    }
  }
  UserWork.init({
    answer: DataTypes.TEXT,
    ChallengeId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWork',
  });
  return UserWork;
};