import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/register",
				{ username, password }
			);
			localStorage.setItem("token", res.data.token);
			navigate("/"); // Redirect to home page
		} catch (err) {
			if (err.response && err.response.status === 400) {
				setError("Username already used.");
			} else {
				setError("Failed to register. Please try again.");
			}
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow" style={{ width: "400px" }}>
				<h2 className="card-title text-center mb-4">Register</h2>
				{error && <div className="alert alert-danger">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100">
						Register
					</button>
				</form>
				<div className="mt-3 text-center">
					<p>
						Already have an account? <a href="/login">Login</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Register;
