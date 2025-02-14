const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
	try {
		const { postId, content } = req.body;
		const comment = await Comment.create({
			postId,
			userId: req.user.id,
			content,
		});
		res.status(201).json(comment);
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getCommentsByPostId = async (req, res) => {
	try {
		const { postId } = req.params;
		const comments = await Comment.findByPostId(postId);
		res.json(comments);
	} catch (err) {
		console.error("Error fetching comments:", err);
		res.status(500).send("Server error.");
	}
};

exports.updateComment = async (req, res) => {
	try {
		const { id } = req.params;
		const { content } = req.body;
		await Comment.update(id, content);
		res.status(200).send("Comment updated successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const { id } = req.params;
		await Comment.delete(id);
		res.status(200).send("Comment deleted successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};