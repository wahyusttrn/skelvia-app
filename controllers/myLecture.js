const { User, UserLecture, Lecture, Challenge, UserWork } = require('../models/index');

class MyLecture {
  static async renderAllMyLectures(req, res) {
    try {
      const { userId } = req.session;
      const data = await User.findByPk(userId, {
        include: Lecture
      });
      res.render('myLectures', { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async renderLectureById(req, res) {
    try {
      const { lectureId } = req.params;
      const data = await Lecture.findByPk(lectureId, {
        include: Challenge
      });
      res.render('lectureById', { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async renderChallenge(req, res) {
    try {
      const { lectureId, challengeId } = req.params;
      const { userId } = req.session;
      const { error } = req.query;

      const userWork = await UserWork.findOne({
        where: {
          UserId: userId,
          ChallengeId: challengeId
        }
      });

      if (userWork) {
        res.redirect(`/myLectures/${lectureId}/challenges/${challengeId}/edit`);
      } else {
        const challenge = await Challenge.findByPk(challengeId);
        res.render('answerBox', { challenge, error });
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerChallenge(req, res) {
    const { challengeId, lectureId } = req.params;
    try {
      const { userId } = req.session;
      const { answer } = req.body;

      await UserWork.create({
        answer,
        ChallengeId: challengeId,
        UserId: userId
      });

      res.redirect(`/myLectures/${lectureId}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errorMsg = error.errors.map((e) => {
          return e.message;
        });

        res.redirect(`/myLectures/${lectureId}/challenges/${challengeId}?error=${errorMsg}`);
      } else {
        res.send(error);
      }
    }
  }
  static async renderEditChallenge(req, res) {
    try {
      const { challengeId } = req.params;
      const { userId } = req.session;
      const { error } = req.query;

      const challenge = await Challenge.findByPk(challengeId);
      const userWork = await UserWork.findOne({
        where: {
          UserId: userId,
          ChallengeId: challengeId
        }
      });

      res.render('editAnswer', { challenge, userWork, error });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerEditChallenge(req, res) {
    const { challengeId, lectureId } = req.params;
    try {
      const { userId } = req.session;
      const { answer } = req.body;

      await UserWork.update({
        answer
      },{
        where: {
          UserId: userId,
          ChallengeId: challengeId
        }
      });

      res.redirect(`/myLectures/${lectureId}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errorMsg = error.errors.map((e) => {
          return e.message;
        });
        
        res.redirect(`/myLectures/${lectureId}/challenges/${challengeId}/edit?error=${errorMsg}`);
      } else {
        res.send(error);
      }
    }
  }
  static async handlerDeleteChallenge(req, res) {
    try {
      const { challengeId, lectureId } = req.params;
      const { userId } = req.session;

      await UserWork.destroy({
        where: {
          UserId: userId,
          ChallengeId: challengeId
        }
      });

      res.redirect(`/myLectures/${lectureId}`);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = MyLecture;