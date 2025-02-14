const db = require("../config/db");

class Post {
	static createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                content TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(userId) REFERENCES users(id)
            )`;
		return db.run(sql);
	}

	static create(post) {
		const { userId, content } = post;
		return new Promise((resolve, reject) => {
			db.run(
				`INSERT INTO posts (userId, content) VALUES (?, ?)`,
				[userId, content],
				function (err) {
					if (err) reject(err);
					resolve({ id: this.lastID });
				}
			);
		});
	}

	static findByUserId(userId) {
		return new Promise((resolve, reject) => {
			db.all(
				`
                SELECT posts.*, users.username, users.profilePicture 
                FROM posts 
                INNER JOIN users ON posts.userId = users.id 
                WHERE posts.userId = ?
                ORDER BY posts.createdAt DESC
            `,
				[userId],
				(err, rows) => {
					if (err) reject(err);
					resolve(rows);
				}
			);
		});
	}

	static findAll() {
		return new Promise((resolve, reject) => {
			db.all(
				`
                SELECT posts.*, users.username, users.profilePicture 
                FROM posts 
                INNER JOIN users ON posts.userId = users.id 
                ORDER BY posts.createdAt DESC
            `,
				(err, rows) => {
					if (err) reject(err);
					resolve(rows);
				}
			);
		});
	}

	// static findAll(userId) {
	// 	return new Promise((resolve, reject) => {
	// 		db.all(
	// 			`
    //             SELECT posts.*, users.username, users.profilePicture,
    //             EXISTS (
    //                 SELECT 1 FROM follows 
    //                 WHERE follows.followerId = ? AND follows.followeeId = posts.userId
    //             ) AS isFollowing
    //             FROM posts 
    //             INNER JOIN users ON posts.userId = users.id 
    //             ORDER BY posts.createdAt DESC
    //         `,
	// 			[userId],
	// 			(err, rows) => {
	// 				if (err) reject(err);
	// 				resolve(rows);
	// 			}
	// 		);
	// 	});
	// }

	static update(id, content) {
		return new Promise((resolve, reject) => {
			db.run(
				`UPDATE posts SET content = ? WHERE id = ?`,
				[content, id],
				function (err) {
					if (err) reject(err);
					resolve();
				}
			);
		});
	}

	static delete(id) {
		return new Promise((resolve, reject) => {
			db.run(`DELETE FROM posts WHERE id = ?`, [id], function (err) {
				if (err) reject(err);
				resolve();
			});
		});
	}
}

module.exports = Post;
