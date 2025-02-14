import React, { useState, useEffect } from "react";
import axios from "axios";

function Like({ postId }) {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	const fetchLikeStatus = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/likes/status/${postId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setLiked(res.data.liked);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchLikeCount = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/likes/count/${postId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setLikeCount(res.data.likeCount);
		} catch (err) {
			console.error(err);
		}
	};

	const handleLike = async () => {
		try {
			if (liked) {
				await axios.post(
					"http://localhost:5000/api/likes/unlike",
					{ postId },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
			} else {
				await axios.post(
					"http://localhost:5000/api/likes/like",
					{ postId },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
			}
			fetchLikeStatus();
			fetchLikeCount();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchLikeStatus();
		fetchLikeCount();
	}, [postId]);

	return (
		<div className="d-flex align-items-center">
			<button onClick={handleLike} className="btn btn-link p-0 me-2">
				{liked ? (
					<i
						className="bi bi-hand-thumbs-up-fill"
						style={{ fontSize: "1.2rem" }}
					></i>
				) : (
					<i
						className="bi bi-hand-thumbs-up"
						style={{ fontSize: "1.2rem" }}
					></i>
				)}
			</button>
			<span>{likeCount}</span>
		</div>
	);
}

export default Like;
