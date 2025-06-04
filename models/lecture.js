'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    static associate(models) {
      Lecture.hasMany(models.Challenge);
      Lecture.hasMany(models.UserLecture);
      Lecture.belongsToMany(models.User, { through: 'UserLecture', foreignKey: 'LectureId' });
    }

    get reviews() {
      if (this.upVote > 50) {
        return 'Recomended!!!!!!';
      } else {
        return 'Kureng sih 👎';
      }
    }
  }
  Lecture.init({
    title: DataTypes.STRING,
    lecturerName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    price: DataTypes.INTEGER,
    upVote: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};