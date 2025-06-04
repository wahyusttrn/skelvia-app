const { User, UserProfile, Lecture, UserLecture } = require('../models/index');

class Profile {
    static async showProfile(req, res) {
        try {
            const userId = 1;
            const user = await User.findOne({
                where: { id: userId },
                include: UserProfile
            });
            
            res.render('profile', { user });
        } catch (err) {
            res.send(err);
        }
    }

}

module.exports = Profile;