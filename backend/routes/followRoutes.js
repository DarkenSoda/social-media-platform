const express = require("express");
const followController = require("../controllers/followController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/follow", auth, followController.followUser);
router.post("/unfollow", auth, followController.unfollowUser);
router.get("/status/:followeeId", auth, followController.isFollowing);
router.get('/followers-count/:userId', auth, followController.getFollowersCount);
router.get('/following-count/:userId', auth, followController.getFollowingCount);
router.get("/following", auth, followController.getFollowingList);

module.exports = router;
