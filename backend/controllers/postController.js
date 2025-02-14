const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const post = await Post.create({
			userId: req.user.id,
			content: req.body.content,
		});
		res.status(201).json(post);
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getPosts = async (req, res) => {
	try {
		const posts = await Post.findByUserId(req.params.userId);
		res.json(posts);
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll(); // Fetch all posts
		res.json(posts);
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

// exports.getAllPosts = async (req, res) => {
// 	try {
// 		const posts = await Post.findAll(req.user.id);
// 		res.json(posts);
// 	} catch (err) {
// 		res.status(500).send("Server error.");
// 	}
// };

exports.deletePost = async (req, res) => {
	try {
		await Post.delete(req.params.id);
		res.status(200).send("Post deleted successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};

exports.updatePost = async (req, res) => {
	try {
		const { content } = req.body;
		await Post.update(req.params.id, content);
		res.status(200).send("Post updated successfully.");
	} catch (err) {
		res.status(500).send("Server error.");
	}
};