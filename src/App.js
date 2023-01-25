import React from "react";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map";
import Login from "./components/Login";
import Home from "./components/Home";
import Button from "./components/Button";

function App() {
	return (
    <div className="app">
      <InfoBox />
      <Table />
      <Map />
      <Login />
      <Home />
      <Button />
		</div>
	);
}

export default App;
