'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLecture extends Model {
    static associate(models) {
      UserLecture.belongsTo(models.User);
      UserLecture.belongsTo(models.Lecture);
    }
  }
  UserLecture.init({
    UserId: DataTypes.INTEGER,
    LectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserLecture',
  });
  return UserLecture;
};