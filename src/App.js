import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import {
	Card,
	CardContent,
	FormControl,
	MenuItem,
	Select,
} from "@material-ui/core";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./components/util";
import numeral from "numeral";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	useEffect(() => {
		const getData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((item) => ({
						name: item.country,
						value: item.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
					setCountries(countries);
				});
		};
		getData();
	}, []);
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => setCountryInfo(data));
	}, []);
	const onCountryChange = async (e) => {
		const url =
			e.target.value === "Kenya"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCountry(e.target.value);
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};

	function removeLogin(e) {
		e.preventDefault();

		let message = document.querySelector(".message")
		let login = document.querySelector(".form");
		login.style.display = "none";
		message.style.display = "contents";
		message.style.margin = "20px";
		message.style.boxShadow = "2px 2px 5px #666";
		// message.style.d = "contents";
		// message.style.display = "contents";
		

		setTimeout(() => {
			message.style.display = "none"
		}, 3000);

	}
	return (
		<div className="app">
			<div className="headerrr">
				<h1>COVID-19 TRACKER</h1>
				<form className="form">
					<input type="text" className="inp" placeholder="email" />
					<input type="text" className="inp" placeholder="password" />
					<button type="submit" onClick={removeLogin}>
						Login
					</button>
				</form>
				<p className="message">Login successful</p>
			</div>
			<div className="app__left">
				<div className="app__header">
					<FormControl className="app__dropdown">
						<Select
							variant="outlined"
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox
						onClick={(e) => setCasesType("cases")}
						title="Reported Cases "
						active={casesType === "cases"}
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={numeral(countryInfo.cases).format("0.0a")}
					/>
					<InfoBox
						onClick={(e) => setCasesType("recovered")}
						title="Reported Recoveries"
						isGreen
						active={casesType === "recovered"}
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={numeral(countryInfo.recovered).format("0.0a")}
					/>
					<InfoBox
						onClick={(e) => setCasesType("deaths")}
						title="Reported Deaths"
						active={casesType === "deaths"}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={numeral(countryInfo.deaths).format("0.0a")}
					/>
				</div>
				<Map
					countries={mapCountries}
					casesType={casesType}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>
			<Card className="app__right">
				<CardContent className="hellooo">
					<h3>Cases by Country</h3>
					<Table countries={tableData} />
					<h3 style={{ marginTop: "25px" }}> New {casesType}</h3>
					<LineGraph casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
