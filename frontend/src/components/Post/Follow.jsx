import React, { useState, useEffect } from "react";
import axios from "axios";

function Follow({ followeeId }) {
	const [isFollowing, setIsFollowing] = useState(false);

	const fetchFollowStatus = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/follows/status/${followeeId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setIsFollowing(res.data.isFollowing);
		} catch (err) {
			console.error(err);
		}
	};

	const handleFollow = async () => {
		try {
			if (isFollowing) {
				await axios.post(
					"http://localhost:5000/api/follows/unfollow",
					{ followeeId },
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
					"http://localhost:5000/api/follows/follow",
					{ followeeId },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
			}
			fetchFollowStatus();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchFollowStatus();
	}, [followeeId]);

	return (
		<button onClick={handleFollow} className="btn btn-primary">
			{isFollowing ? "Unfollow" : "Follow"}
		</button>
	);
}

export default Follow;
