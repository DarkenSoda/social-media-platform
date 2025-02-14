const db = require("../config/db");

class User {
	static createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                profilePicture TEXT DEFAULT 'https://www.w3schools.com/howto/img_avatar.png',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`;
		return db.run(sql);
	}

	static findByUsername(username) {
		return new Promise((resolve, reject) => {
			db.get(
				`SELECT * FROM users WHERE username = ?`,
				[username],
				(err, row) => {
					if (err) reject(err);
					resolve(row);
				}
			);
		});
	}

	static create(user) {
		const { username, password } = user;
		return new Promise((resolve, reject) => {
			db.run(
				`INSERT INTO users (username, password) VALUES (?, ?)`,
				[username, password],
				function (err) {
					if (err) reject(err);
					resolve({ id: this.lastID });
				}
			);
		});
	}

	static updateProfilePicture(userId, profilePicture) {
		return new Promise((resolve, reject) => {
			db.run(
				`UPDATE users SET profilePicture = ? WHERE id = ?`,
				[profilePicture, userId],
				function (err) {
					if (err) reject(err);
					resolve();
				}
			);
		});
	}
}

module.exports = User;
