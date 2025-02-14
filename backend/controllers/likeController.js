const Like = require("../models/Like");

exports.likePost = async (req, res) => {
	try {
		const { postId } = req.body;
		const userId = req.user.id; // Get the logged-in user's ID

		// Check if the user has already liked the post
		const existingLike = await Like.findByUserAndPost(userId, postId);
		if (existingLike) {
			return res.status(400).json({ message: "You have already liked this post." });
		}

		// Create a new like
		await Like.create({ postId, userId });

		// Fetch the updated like count
		const likeCount = await Like.countByPostId(postId);

		res.status(201).json({ likeCount });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.unlikePost = async (req, res) => {
	try {
		const { postId } = req.body;
		await Like.delete({ postId, userId: req.user.id });
		const likeCount = await Like.countByPostId(postId);
		res.json({ likeCount });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getLikeStatus = async (req, res) => {
	try {
		const { postId } = req.params;
		const like = await Like.findByUserAndPost(req.user.id, postId);
		res.json({ liked: !!like });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getLikeCount = async (req, res) => {
	try {
		const { postId } = req.params;
		const likeCount = await Like.countByPostId(postId);
		res.json({ likeCount });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};
