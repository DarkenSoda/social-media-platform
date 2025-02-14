const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:username', auth, userController.getProfile);
router.post('/update-profile-picture', auth, userController.updateProfilePicture);

module.exports = router;