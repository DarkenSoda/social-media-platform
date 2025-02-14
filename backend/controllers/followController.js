const Follow = require("../models/Follow");

exports.followUser = async (req, res) => {
	try {
		const { followeeId } = req.body;
		await Follow.create({ followerId: req.user.id, followeeId });
		res.status(201).send("Followed successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.unfollowUser = async (req, res) => {
	try {
		const { followeeId } = req.body;
		await Follow.delete({ followerId: req.user.id, followeeId });
		res.send("Unfollowed successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.isFollowing = async (req, res) => {
	try {
		const { followeeId } = req.params;
		const isFollowing = await Follow.isFollowing(req.user.id, followeeId);
		res.json({ isFollowing });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getFollowersCount = async (req, res) => {
	try {
		const { userId } = req.params;
		const count = await Follow.countFollowers(userId);
		res.json({ count });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getFollowingCount = async (req, res) => {
	try {
		const { userId } = req.params;
		const count = await Follow.countFollowing(userId);
		res.json({ count });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getFollowingList = async (req, res) => {
	try {
		const followerId = req.user.id;
		const followingList = await Follow.getFollowingList(followerId);
		res.json({ following: followingList });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};