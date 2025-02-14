const db = require("../config/db");

class Follow {
	static createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS follows (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                followerId INTEGER,
                followeeId INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (followerId) REFERENCES users(id),
                FOREIGN KEY (followeeId) REFERENCES users(id),
                UNIQUE (followerId, followeeId) -- Ensure a user can follow another user only once
            )`;
		return db.run(sql);
	}

	static create(follow) {
		const { followerId, followeeId } = follow;
		return new Promise((resolve, reject) => {
			db.run(
				`INSERT INTO follows (followerId, followeeId) VALUES (?, ?)`,
				[followerId, followeeId],
				function (err) {
					if (err) reject(err);
					resolve({ id: this.lastID });
				}
			);
		});
	}

	static delete(follow) {
		const { followerId, followeeId } = follow;
		return new Promise((resolve, reject) => {
			db.run(
				`DELETE FROM follows WHERE followerId = ? AND followeeId = ?`,
				[followerId, followeeId],
				function (err) {
					if (err) reject(err);
					resolve();
				}
			);
		});
	}

	static isFollowing(followerId, followeeId) {
		return new Promise((resolve, reject) => {
			db.get(
				`SELECT * FROM follows WHERE followerId = ? AND followeeId = ?`,
				[followerId, followeeId],
				(err, row) => {
					if (err) reject(err);
					resolve(!!row);
				}
			);
		});
	}

	static countFollowers(followeeId) {
		return new Promise((resolve, reject) => {
			db.get(
				`SELECT COUNT(*) AS count FROM follows WHERE followeeId = ?`,
				[followeeId],
				(err, row) => {
					if (err) reject(err);
					resolve(row.count);
				}
			);
		});
	}

	static countFollowing(followerId) {
		return new Promise((resolve, reject) => {
			db.get(
				`SELECT COUNT(*) AS count FROM follows WHERE followerId = ?`,
				[followerId],
				(err, row) => {
					if (err) reject(err);
					resolve(row.count);
				}
			);
		});
	}

	static getFollowingList(followerId) {
		return new Promise((resolve, reject) => {
			db.all(
				`SELECT followeeId FROM follows WHERE followerId = ?`,
				[followerId],
				(err, rows) => {
					if (err) reject(err);
					// Extract followeeId from rows and return as an array
					const followingList = rows.map((row) => row.followeeId);
					resolve(followingList);
				}
			);
		});
	}
}

module.exports = Follow;