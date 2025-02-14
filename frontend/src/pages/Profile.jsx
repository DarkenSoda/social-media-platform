import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Post from "../components/Post/Post";

function Profile() {
	const {
		username: loggedInUsername,
		userId: loggedInUserId,
		following,
		followUser,
		unfollowUser,
	} = useContext(AuthContext);
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [profilePictureUrl, setProfilePictureUrl] = useState(
		"https://www.w3schools.com/howto/img_avatar.png"
	);
	const [newProfilePictureUrl, setNewProfilePictureUrl] = useState("");
	const [isFollowing, setIsFollowing] = useState(false);
	const [followersCount, setFollowersCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/users/${username}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setUser(res.data.user);

				// Fetch followers and following counts
				const followersRes = await axios.get(
					`http://localhost:5000/api/follows/followers-count/${res.data.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setFollowersCount(followersRes.data.count);

				const followingRes = await axios.get(
					`http://localhost:5000/api/follows/following-count/${res.data.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setFollowingCount(followingRes.data.count);

				// Fetch follow status
				if (loggedInUsername !== username) {
					const followStatusRes = await axios.get(
						`http://localhost:5000/api/follows/status/${res.data.user.id}`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}
					);
					setIsFollowing(followStatusRes.data.isFollowing);
				}

				// Set the profile picture URL
				if (res.data.user.profilePicture) {
					setProfilePictureUrl(res.data.user.profilePicture);
				}

				// Fetch user's posts
				const postsRes = await axios.get(
					`http://localhost:5000/api/posts/${res.data.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setPosts(postsRes.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProfile();
	}, [username, loggedInUsername]);

	const handleFollow = async () => {
		try {
			if (following.includes(user.id)) {
				await unfollowUser(user.id);
			} else {
				await followUser(user.id);
			}

			// Refresh followers count
			const followersRes = await axios.get(
				`http://localhost:5000/api/follows/followers-count/${user.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setFollowersCount(followersRes.data.count);
		} catch (err) {
			console.error(err);
		}
	};

	const handleUpdateProfilePicture = async (e) => {
		e.preventDefault();
		if (!newProfilePictureUrl) {
			alert("Please enter a valid image URL.");
			return;
		}

		try {
			const res = await axios.post(
				"http://localhost:5000/api/users/update-profile-picture",
				{ profilePicture: newProfilePictureUrl },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);

			// Update the profile picture URL
			setProfilePictureUrl(newProfilePictureUrl);
			setNewProfilePictureUrl(""); // Clear the input field
		} catch (err) {
			console.error(err);
			alert("Failed to update profile picture. Please try again.");
		}
	};

	const handleDeletePost = (postId) => {
		setPosts(posts.filter((post) => post.id !== postId));
	};

	const handleEditPost = (postId, editedContent) => {
		setPosts(
			posts.map((post) =>
				post.id === postId ? { ...post, content: editedContent } : post
			)
		);
	};

	if (!user) return <div>Loading...</div>;

	return (
		<div className="container">
			<h1>{user.username}'s Profile</h1>
			<div className="mb-4">
				<img
					src={profilePictureUrl}
					alt="Profile"
					className="rounded-circle"
					style={{ width: "100px", height: "100px" }}
				/>
				<div className="mt-2">
					<p>
						<strong>Followers:</strong> {followersCount} |{" "}
						<strong>Following:</strong> {followingCount}
					</p>
					{loggedInUsername !== username && (
						<button
							onClick={handleFollow}
							className="btn btn-primary"
						>
							{following.includes(user?.id) ? "Unfollow" : "Follow"}
						</button>
					)}
					{loggedInUsername === username && (
						<form
							onSubmit={handleUpdateProfilePicture}
							className="mt-2"
						>
							<div className="mb-2">
								<input
									type="text"
									className="form-control"
									placeholder="Enter image URL"
									value={newProfilePictureUrl}
									onChange={(e) =>
										setNewProfilePictureUrl(e.target.value)
									}
									required
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Update Profile Picture
							</button>
						</form>
					)}
				</div>
			</div>

			<h2>Your Posts</h2>
			<ul className="list-group">
				{posts.map((post) => (
					<Post
						key={post.id}
						post={post}
						onDelete={handleDeletePost}
						onEdit={handleEditPost}
					/>
				))}
			</ul>
		</div>
	);
}

export default Profile;