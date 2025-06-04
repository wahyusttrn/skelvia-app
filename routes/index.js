const express = require('express');
const router = express.Router();
const Main = require('../controllers/main');

const lectureRoutes = require('./lectures');
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

router.get('/', Main.homepage);
router.get('/login', Main.renderLogin);
router.post('/login', Main.handlerLogin);
router.get('/register', Main.renderRegister);
router.post('/register', Main.handlerRegister);
router.get('/logout', Main.handlerLogout);

router.use('/lectures', lectureRoutes);
router.use('/profile', authMiddleware, profileRoutes);
router.use('/myLectures', authMiddleware, myLectureRoutes);

module.exports = router;