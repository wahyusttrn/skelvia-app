'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    static associate(models) {
      Challenge.belongsTo(models.Lecture);
      Challenge.hasOne(models.UserWork);
    }
  }
  Challenge.init({
    title: DataTypes.STRING,
    challengeDetail: DataTypes.TEXT,
    LectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};