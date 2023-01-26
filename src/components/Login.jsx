import React from "react";

const Login = () => {
	function removeLogin(e) {
		e.preventDefault();

		const login = document.getElementById("login-page");
		const search = document.getElementById("search");

		login.style.display = "none";
		search.style.display = "contents";
	}

	return (
		<div>
			<form action="" id="login-page">
				<input type="text" placeholder="Name" className="input" />
				<input
					type="password"
					name=""
					id=""
					placeholder="Password"
					className="input"
				/>
				<button type="submit" className="btn" onClick={removeLogin}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
