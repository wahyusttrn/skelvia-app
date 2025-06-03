'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile);
      User.hasMany(models.UserWork);
      User.hasMany(models.UserLecture);
      User.belongsToMany(models.Lecture, { through: 'UserLecture', foreignKey: 'UserId' });
      User.belongsToMany(models.Challenge, { through: 'UserWork', foreignKey: 'UserId' });
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};