const express = require('express');
const likeController = require('../controllers/likeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/like', auth, likeController.likePost);
router.post('/unlike', auth, likeController.unlikePost);
router.get('/status/:postId', auth, likeController.getLikeStatus);
router.get('/count/:postId', auth, likeController.getLikeCount);

module.exports = router;