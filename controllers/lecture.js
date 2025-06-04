const { Op } = require('sequelize');
const { Lecture, Challenge, UserLecture, User } = require('../models/index');
const { formatMoney, getInvoice } = require('../helpers/helper');

class LectureController {
    static async listLectures(req, res) {
        try {
            const { search, error } = req.query;
            let data;

            if (search) {
                data = await Lecture.findAll({
                    where: {
                        title: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    include: {
                        model: Challenge,
                        attributes: ['title']
                    }   
                });
            } else {
                data = await Lecture.findAll({
                    include: {
                        model: Challenge,
                        attributes: ['title']
                    }   
                });
            }

            res.render('lecture', { data, error, formatMoney });
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
            const { userId } = req.session;

            const userLecture = await UserLecture.findOne({
                where: {
                    UserId: userId,
                    LectureId: lectureId
                }
            });

            const lecture = await Lecture.findByPk(lectureId);

            if (userLecture) {
                const error = 'Barang udah dibeli woy!';
                res.redirect(`/lectures?error=${error}`);
            } else {
                await UserLecture.create({
                    UserId: userId,
                    LectureId: lectureId
                });
                await getInvoice(userId, lecture.title, lecture.price);
                res.redirect('/');
            }
        } catch (err) {
            res.send(err);
        }
    }

}


module.exports = LectureController;