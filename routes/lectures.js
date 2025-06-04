const express = require('express');
const router = express.Router();
const LectureController = require('../controllers/lecture');

// router.get('/', );

router.get('/lectures', LectureController.listLectures);
router.get('/lectures/:lectureId', LectureController.showLecture);
router.get('/lectures/:lectureId/buy', LectureController.buyLecture);

module.exports = router;