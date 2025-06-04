const express = require('express');
const router = express.Router();
const Profile = require('../controllers/profile');

router.get('/', Profile.showProfile);

router.get('/profile', Profile.showProfile)
module.exports = router;