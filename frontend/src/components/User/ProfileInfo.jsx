import React from "react";

function ProfileInfo({ user }) {
	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title">{user.username}</h2>
				<p className="card-text">{user.email}</p>
			</div>
		</div>
	);
}

export default ProfileInfo;
