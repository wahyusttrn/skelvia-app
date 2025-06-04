const { Lecture, Challenge, UserLecture, User } = require('../models/index');

class LectureController {
    static async listLectures(req, res) {
        try {
            let lectures = await Lecture.findAll({
                include: {
                    model: Challenge,
                    attributes: ['title']
                }   
            });
            res.render('lecture', { lectures });
        } catch (err) {
            res.send(err);
        }
    }

    static async showLecture(req, res) {
        try {
            const { lectureId } = req.params;

            let data = await Lecture.findByPk(lectureId, {
                include: Challenge
            });

            let lectures = await Lecture.findAll();

            res.render('lecture-detail', { data, lectures });
        } catch (err) {
            res.send(err);
        }
    }

    static async buyLecture(req, res) {
        try {
            const { lectureId } = req.params;
            const userId = 1;

            let lecture = await Lecture.findByPk(lectureId);

            let userLecture = await UserLecture.create({
                UserId: userId,
                LectureId: lectureId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            res.redirect('/');
        } catch (err) {
            res.send(err);
        }
    }

}


module.exports = LectureController;