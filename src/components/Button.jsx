import React from "react";

const Button = () => {
	function loadSignin() {
		const loginForm = document.getElementById("login-page");
		const loginBtn = document.querySelector(".login-btn");

		loginBtn.style.display = "none";
		loginForm.style.display = "flex";
	}
	return (
		<div>
			<button onClick={loadSignin} className="login-btn">
				Login
			</button>
		</div>
	);
};

export default Button;
