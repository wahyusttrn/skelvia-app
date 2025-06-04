const { Lecture, Challenge, UserLecture, User } = require('../models/index');

class Lecture {
    static async listLectures(req, res) {
        try {
            let lectures = await Lecture.findAll({
                include: {
                    model: Challenge,
                    attributes: ['title']
                }
            });
            res.render('lectures/index', { lectures });
        } catch (err) {
            res.send(err);
        }
    }

    
}

module.exports = Lecture;