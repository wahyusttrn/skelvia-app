const { User, UserProfile, Lecture, UserLecture } = require('../models/index');

class Profile {
    static async showProfile(req, res) {
        try {
            const { userId } = req.session;
            const user = await User.findByPk(userId, {
                include: UserProfile
            });
            
            res.render('profile', { user });
        } catch (err) {
            res.send(err);
        }
    }

}

module.exports = Profile;