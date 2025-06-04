const express = require('express');
const router = express.Router();
const Main = require('../controllers/main');
const LectureController = require('../controllers/lecture');

// const lectureRoutes = require('./lectures'); <----
const profileRoutes = require('./profile');
const myLectureRoutes = require('./myLectures');

const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const error = 'Login dulu brok!';
    res.redirect(`/login?error=${error}`);
  }
}

const dontGetInIfLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
}

const onlyAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', Main.homepage);
router.get('/login', dontGetInIfLoggedIn, Main.renderLogin);
router.post('/login', dontGetInIfLoggedIn, Main.handlerLogin);
router.get('/register', dontGetInIfLoggedIn, Main.renderRegister);
router.post('/register', dontGetInIfLoggedIn, Main.handlerRegister);
router.get('/logout', Main.handlerLogout);

router.get('/allUsers', onlyAdmin, Main.renderAllUsers);
router.get('/allUsers/:userId', onlyAdmin, Main.deleteUser);

router.get('/lectures', LectureController.listLectures);
router.get('/lectures/:lectureId/buy', authMiddleware, LectureController.buyLecture);

router.use('/profile', authMiddleware, profileRoutes);
router.use('/myLectures', authMiddleware, myLectureRoutes);

module.exports = router;