'use strict';

const { hashPass } = require('../helpers/helper');

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
      // User.belongsToMany(models.Challenge, { through: 'UserWork', foreignKey: 'UserId' });
    }

    static async myFullProfiles(id) {
      return await User.findByPk(id, {
        include: 'UserProfile'
      });
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full Name cannot be Null'
        },
        notEmpty: {
          msg: 'Full Name cannot be empty'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Username cannot be Null'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email cannot be Null'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be Null'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role cannot be Null'
        },
        notEmpty: {
          msg: 'Role cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeValidate(value) {
        value.role = 'student';
      },
      beforeCreate(value) {
        value.password = hashPass(value.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};