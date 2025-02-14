const db = require("../config/db");

class Like {
	static createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                postId INTEGER,
                userId INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (postId) REFERENCES posts(id),
                FOREIGN KEY (userId) REFERENCES users(id),
                UNIQUE (postId, userId) -- Ensure a user can like a post only once
            )`;
		return db.run(sql);
    }
    
    static create(like) {
        const { postId, userId } = like;
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO likes (postId, userId) VALUES (?, ?)`,
                [postId, userId], function (err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID });
                });
        });
    }

    static delete(like) {
        const { postId, userId } = like;
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM likes WHERE postId = ? AND userId = ?`,
                [postId, userId], function (err) {
                    if (err) reject(err);
                    resolve();
                });
        });
    }

    static countByPostId(postId) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS count FROM likes WHERE postId = ?`, [postId], (err, row) => {
                if (err) reject(err);
                resolve(row.count);
            });
        });
    }

    static findByUserAndPost(userId, postId) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM likes WHERE userId = ? AND postId = ?`, [userId, postId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = Like;