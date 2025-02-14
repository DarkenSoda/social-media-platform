import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Comment({ postId }) {
	const {
		username: loggedInUsername,
		userId: loggedInUserId,
		following,
		followUser,
		unfollowUser,
	} = useContext(AuthContext);
	const [content, setContent] = useState("");
	const [comments, setComments] = useState([]);
	const [editingCommentId, setEditingCommentId] = useState(null);
	const [editedContent, setEditedContent] = useState("");
	const [showComments, setShowComments] = useState(false); // State to toggle comments visibility
	const navigate = useNavigate();

	const fetchComments = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/comments/${postId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setComments(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				"http://localhost:5000/api/comments",
				{ postId, content },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setContent("");
			fetchComments(); // Refresh comments
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditComment = (comment) => {
		setEditingCommentId(comment.id);
		setEditedContent(comment.content);
	};

	const handleSaveEdit = async (commentId) => {
		try {
			await axios.put(
				`http://localhost:5000/api/comments/${commentId}`,
				{ content: editedContent },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setEditingCommentId(null);
			fetchComments(); // Refresh comments
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			await axios.delete(
				`http://localhost:5000/api/comments/${commentId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			fetchComments(); // Refresh comments
		} catch (err) {
			console.error(err);
		}
	};

	const handleProfileClick = (username) => {
		navigate(`/profile/${username}`);
	};

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	useEffect(() => {
		fetchComments();
	}, [postId]);

	return (
		<div className="mt-3">
			{/* Comment Count and Toggle Button */}
			<button
				className="btn btn-link p-0 text-primary mb-2"
				onClick={toggleComments}
			>
				Comments ({comments.length})
			</button>

			{/* Display comments if expanded */}
			{showComments && (
				<div>
					<div className="comments-section mb-3">
						{comments.map((comment) => (
							<div
								key={comment.id}
								className="comment mb-2 p-2 border rounded"
							>
								<div className="d-flex align-items-center mb-1">
									<div className="d-flex align-items-center justify-content-between mb-1">
										<div className="d-flex align-items-center">
											<img
												src={
													comment.profilePicture ||
													"https://www.w3schools.com/howto/img_avatar.png"
												}
												alt="Profile"
												className="rounded-circle me-2"
												style={{
													width: "25px",
													height: "25px",
													cursor: "pointer",
												}}
												onClick={() =>
													handleProfileClick(
														comment.username
													)
												}
											/>
											<strong
												className="me-2"
												style={{ cursor: "pointer" }}
												onClick={() =>
													handleProfileClick(
														comment.username
													)
												}
											>
												{comment.username}
											</strong>
										</div>
										{comment.username !==
											loggedInUsername && (
											<button
												className="btn btn-link p-0 text-primary"
												onClick={() =>
													following.includes(
														comment.userId
													)
														? unfollowUser(
																comment.userId
														  )
														: followUser(
																comment.userId
														  )
												}
											>
												{following.includes(
													comment.userId
												)
													? "Unfollow"
													: "Follow"}
											</button>
										)}
									</div>
									{comment.username === loggedInUsername && (
										<div className="ms-auto">
											<button
												className="btn btn-link p-0 me-2"
												onClick={() =>
													handleEditComment(comment)
												}
											>
												<i className="bi bi-pencil"></i>
											</button>
											<button
												className="btn btn-link p-0"
												onClick={() =>
													handleDeleteComment(
														comment.id
													)
												}
											>
												<i
													className="bi bi-trash"
													style={{
														color: "red",
													}}
												></i>
											</button>
										</div>
									)}
								</div>
								{editingCommentId === comment.id ? (
									<div>
										<textarea
											className="form-control mb-2"
											value={editedContent}
											onChange={(e) =>
												setEditedContent(e.target.value)
											}
										/>
										<button
											className="btn btn-success me-2"
											onClick={() =>
												handleSaveEdit(comment.id)
											}
										>
											Save
										</button>
										<button
											className="btn btn-secondary"
											onClick={() =>
												setEditingCommentId(null)
											}
										>
											Cancel
										</button>
									</div>
								) : (
									<p className="mb-0">{comment.content}</p>
								)}
							</div>
						))}
					</div>
					
					{/* Comment Form */}
					<form onSubmit={handleSubmit}>
						<textarea
							className="form-control mb-2"
							placeholder="Write a comment..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							style={{ height: "17px" }}
							required
						/>
						<button type="submit" className="btn btn-primary">
							Comment
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default Comment;
