const db = require("../config/db");

class Comment {
	static createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                postId INTEGER,
                userId INTEGER,
                content TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (postId) REFERENCES posts(id),
                FOREIGN KEY (userId) REFERENCES users(id)
            )`;
		return db.run(sql);
	}

	static create(comment) {
		const { postId, userId, content } = comment;
		return new Promise((resolve, reject) => {
			db.run(
				`INSERT INTO comments (postId, userId, content) VALUES (?, ?, ?)`,
				[postId, userId, content],
				function (err) {
					if (err) reject(err);
					resolve({ id: this.lastID });
				}
			);
		});
	}

	static findByPostId(postId) {
		return new Promise((resolve, reject) => {
			db.all(
				`
                SELECT comments.*, users.username, users.profilePicture 
                FROM comments 
                INNER JOIN users ON comments.userId = users.id 
                WHERE comments.postId = ?
                ORDER BY comments.createdAt ASC
            `,
				[postId],
				(err, rows) => {
					if (err) reject(err);
					resolve(rows);
				}
			);
		});
	}

	static update(id, content) {
		return new Promise((resolve, reject) => {
			db.run(
				`UPDATE comments SET content = ? WHERE id = ?`,
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
			db.run(`DELETE FROM comments WHERE id = ?`, [id], function (err) {
				if (err) reject(err);
				resolve();
			});
		});
	}
}

module.exports = Comment;
