import React from "react";
import Button from "./Button";
import Login from "./Login";

const Home = () => {
	return (
		<div id="home">
			<div className="header">
				<h1 className="h1">COVID-19 Tracker</h1>
				<Login />
				<Button />
			</div>

		</div>
	);
};

export default Home;
