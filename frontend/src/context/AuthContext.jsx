import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("token")
	);
	const [username, setUsername] = useState(
		localStorage.getItem("username") || ""
	);
	const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
	const [following, setFollowing] = useState(
		JSON.parse(localStorage.getItem("following")) || []
	);

	// Fetch the logged-in user's following list on initial load
	useEffect(() => {
		if (isLoggedIn) {
			fetchFollowingList();
		}
	}, [isLoggedIn]);

	const fetchFollowingList = async () => {
		try {
			const res = await axios.get(
				"http://localhost:5000/api/follows/following",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setFollowing(res.data.following);
			localStorage.setItem(
				"following",
				JSON.stringify(res.data.following)
			);
		} catch (err) {
			console.error(err);
		}
	};

	const login = (token, username, userId) => {
		localStorage.setItem("token", token);
		localStorage.setItem("username", username);
		localStorage.setItem("userId", userId);
		setIsLoggedIn(true);
		setUsername(username);
		setUserId(userId);
		fetchFollowingList(); // Fetch following list after login
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("userId");
		localStorage.removeItem("following");
		setIsLoggedIn(false);
		setUsername("");
		setUserId("");
		setFollowing([]);
	};

	const followUser = async (followeeId) => {
		try {
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
			setFollowing((prev) => [...prev, followeeId]); // Update the following state
		} catch (err) {
			console.error(err);
		}
	};

	const unfollowUser = async (followeeId) => {
		try {
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
			setFollowing((prev) => prev.filter((id) => id !== followeeId)); // Update the following state
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				username,
				userId,
				following,
				login,
				logout,
				followUser,
				unfollowUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
