const express = require('express');
const router = express.Router();
const Main = require('../controllers/main');

const lectureRoutes = require('./lectures');
const profileRoutes = require('./profile');
const myLectureRoutes = require('./myLectures');

router.get('/', Main.homepage);

router.use('/lectures', lectureRoutes);
router.use('/profile', profileRoutes);
router.use('/myLecture', myLectureRoutes);

module.exports = router;