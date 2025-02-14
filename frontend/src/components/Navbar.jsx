import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
	const { isLoggedIn, username, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Social Media
				</Link>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{isLoggedIn && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/">
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to={`/profile/${username}`}
									>
										Profile
									</Link>
								</li>
							</>
						)}
					</ul>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{isLoggedIn ? (
							<li className="nav-item">
								<button
									className="btn btn-link nav-link"
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/register">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
