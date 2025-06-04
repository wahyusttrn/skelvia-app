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
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Jawaban gaboleh Null'
        },
        notEmpty: {
          msg: 'Jawaban gaboleh kosong'
        },
        isTwoWords(value) {
          if (value.split(' ').length < 2) {
            throw new Error('Minimal 2 kata lah brok!');
          }
        }
      }
    },
    ChallengeId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWork',
  });
  return UserWork;
};