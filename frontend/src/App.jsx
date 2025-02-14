import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<Router>
			<Navbar />
			<div className="container mt-4">
				<Routes>
					<Route
						path="/"
						element={
							isLoggedIn ? <Home /> : <Navigate to="/login" />
						}
					/>
					<Route
						path="/login"
						element={isLoggedIn ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/register"
						element={
							isLoggedIn ? <Navigate to="/" /> : <Register />
						}
					/>
					<Route
						path="/profile/:username"
						element={
							isLoggedIn ? <Profile /> : <Navigate to="/login" />
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
