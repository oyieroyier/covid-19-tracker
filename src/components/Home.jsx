import React from "react";
import Button from "./Button";
import Login from "./Login";
import Search from "./Search";

const Home = () => {
	return (
		<div id="home">
			<div className="header">
				<h1 className="h1">COVID-19 TRACKER</h1>
				<Login />
				<Search />
				<Button />
			</div>

			{/* <h2>H2 Header</h2> */}
			{/* <Product /> */}
		</div>
	);
};

export default Home;
