const express = require('express');
const router = express.Router();
const MyLecture = require('../controllers/myLecture');

router.get('/', MyLecture.renderAllMyLectures);
router.get('/:lectureId', MyLecture.renderLectureById);
router.get('/:lectureId/challenges/:challengeId', MyLecture.renderChallenge);
router.post('/:lectureId/challenges/:challengeId', MyLecture.handlerChallenge);
router.get('/:lectureId/challenges/:challengeId/edit', MyLecture.renderEditChallenge);
router.post('/:lectureId/challenges/:challengeId/edit', MyLecture.handlerEditChallenge);
router.get('/:lectureId/challenges/:challengeId/delete', MyLecture.handlerDeleteChallenge);

module.exports = router;