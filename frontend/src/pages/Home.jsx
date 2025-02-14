import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Post from "../components/Post/Post";

function Home() {
	const { isLoggedIn } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
			return;
		}

		fetchPosts();
	}, [isLoggedIn, navigate]);

	const fetchPosts = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/posts", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setPosts(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreatePost = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				"http://localhost:5000/api/posts",
				{ content: newPost },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setNewPost("");
			fetchPosts();
		} catch (err) {
			console.error(err);
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

	return (
		<div className="container">
			<h1>Home</h1>

			{/* Create Post Block */}
			<div className="card mb-4">
				<div className="card-body">
					<form onSubmit={handleCreatePost}>
						<div className="mb-3">
							<textarea
								className="form-control"
								rows="3"
								placeholder="What's on your mind?"
								value={newPost}
								onChange={(e) => setNewPost(e.target.value)}
								required
							></textarea>
						</div>
						<button type="submit" className="btn btn-primary">
							Post
						</button>
					</form>
				</div>
			</div>

			{/* Display Posts */}
			<h2>Posts</h2>
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

export default Home;
