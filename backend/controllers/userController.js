const User = require('../models/User');
const Post = require('../models/Post');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByUsername(req.params.username);
        if (!user) return res.status(404).send('User not found.');

        const posts = await Post.findByUserId(user.id);
        res.json({ user, posts });
    } catch (err) {
        res.status(500).send('Server error.');
    }
};

exports.updateProfilePicture = async (req, res) => {
	try {
		const { profilePicture } = req.body; // Expect a URL in the request body
		if (!profilePicture) {
			return res.status(400).send("Profile picture URL is required.");
		}

		// Update the profile picture in the database
		await User.updateProfilePicture(req.user.id, profilePicture);

		// Return the updated profile picture URL
		res.status(200).json({ profilePicture });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error.");
	}
};