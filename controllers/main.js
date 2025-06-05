const { User, UserProfile } = require('../models/index');
const { comparePass } = require('../helpers/helper');

class Main {
  static async homepage(req, res) {
    try {
      const { userId } = req.session;
      const user = await User.myFullProfiles(userId);
      res.render('homepage', { user });
    } catch (error) {
      res.send(error);
    }
  }
  static async renderLogin(req, res) {
    try {
      const { error } = req.query;
      res.render('login', { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (user) {
        const isValid = comparePass(password, user.password);
        if (isValid) {
          req.session.userId = user.id;
          req.session.role = user.role;
          res.redirect('/');
        } else {
          const error = 'Email or Password is wrong';
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = 'Email not found';
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async renderRegister(req, res) {
    try {
      const { error } = req.query;
      res.render('register', { error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerRegister(req, res) {
    try {
      const { fullName, username, email, password, profilePicUrl, aboutMe } = req.body;
      const createUser = await User.create({ fullName, username, email, password });
      await UserProfile.create({ profilePicUrl, aboutMe, sumGraduate: 0, UserId: createUser.id });
      res.redirect('/login');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errorMsg = error.errors.map((e) => {
          return e.message;
        });

        res.redirect(`/register?error=${errorMsg}`);
      } else {
        res.send(error);
      }
    }
  }
  static async handlerLogout(req, res) {
    try {
      req.session.destroy();
      res.redirect('/login');
    } catch (error) {
      res.send(error);
    }
  }
  static async renderAllUsers(req, res) {
    try {
      const data = await User.findAll();
      res.render('allUsers', { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await User.destroy({
        where: {
          id: userId
        }
      });
      res.redirect('/');
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Main;