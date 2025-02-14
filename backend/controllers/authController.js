const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).send('Username already used.');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create the user
        const user = await User.create({ username, password: hashedPassword });

        // Generate a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token
        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error.');
    }
};

exports.login = async (req, res) => {
	try {
		const user = await User.findByUsername(req.body.username);
		if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(400).send("Invalid credentials.");
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		res.status(500).send("Server error.");
	}
};
