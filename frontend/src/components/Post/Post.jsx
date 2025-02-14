import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Comment from "./Comment";
import Like from "./Like";

const Post = ({ post, onDelete, onEdit }) => {
	const {
		username: loggedInUsername,
		userId: loggedInUserId,
		following,
		followUser,
		unfollowUser,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const [editing, setEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(post.content);

	const handleProfileClick = (username) => {
		navigate(`/profile/${username}`);
	};

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSaveEdit = async () => {
		try {
			await axios.put(
				`http://localhost:5000/api/posts/${post.id}`,
				{ content: editedContent },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			onEdit(post.id, editedContent); // Notify parent component to update the state
			setEditing(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCancelEdit = () => {
		setEditing(false);
		setEditedContent(post.content); // Reset to original content
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${post.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			onDelete(post.id); // Notify parent component to remove the post
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<li className="list-group-item">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<div className="d-flex align-items-center">
					<img
						src={
							post.profilePicture ||
							"https://www.w3schools.com/howto/img_avatar.png"
						}
						alt="Profile"
						className="rounded-circle me-2"
						style={{
							width: "30px",
							height: "30px",
							cursor: "pointer",
						}}
						onClick={() => handleProfileClick(post.username)}
					/>
					<strong
						className="me-2"
						style={{ cursor: "pointer" }}
						onClick={() => handleProfileClick(post.username)}
					>
						{post.username}
					</strong>
					<small className="text-muted">
						{new Date(post.createdAt).toLocaleString()}
					</small>
				</div>
				{post.username === loggedInUsername && (
					<div>
						<button
							className="btn btn-link p-0 me-2"
							onClick={handleEdit}
						>
							<i className="bi bi-pencil"></i>
						</button>
						<button
							className="btn btn-link p-0"
							onClick={handleDelete}
						>
							<i
								className="bi bi-trash"
								style={{ color: "red" }}
							></i>
						</button>
					</div>
				)}
				{post.username !== loggedInUsername && (
					<button
						className="btn btn-link p-0 text-primary"
						onClick={() =>
							following.includes(post.userId)
								? unfollowUser(post.userId)
								: followUser(post.userId)
						}
					>
						{following.includes(post.userId)
							? "Unfollow"
							: "Follow"}
					</button>
				)}
			</div>
			{editing ? (
				<div>
					<textarea
						className="form-control mb-2"
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<button
						className="btn btn-success me-2"
						onClick={handleSaveEdit}
					>
						Save
					</button>
					<button
						className="btn btn-secondary"
						onClick={handleCancelEdit}
					>
						Cancel
					</button>
				</div>
			) : (
				<p
					dangerouslySetInnerHTML={{
						__html: post.content.replace(/\n/g, "<br />"),
					}}
				></p>
			)}
			<Like postId={post.id} />
			<Comment postId={post.id} />
		</li>
	);
};

export default Post;
