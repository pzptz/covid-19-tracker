import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import { formatNumbers, sort } from "./utils";

// components
import Cards from "./components/Cards";
import Table from "./components/Table";
import Map from "./components/Map";
import Graph from "./components/Graph";

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState(["US", "UK"]);
  const [country, setCountry] = useState("worldwide");
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 30.34534, lng: -40.3534 });
  const [mapZoom, setMapZoom] = useState(3);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    let URL = "";
    let lat = 30.34534;
    let long = -40.3534;
    let data;
    let response;
    let zoom;
    if (countryCode === "worldwide") {
      URL = "https://disease.sh/v3/covid-19/all";
      response = await fetch(URL);
      data = await response.json();
      zoom = 2;
    } else {
      URL = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      response = await fetch(URL);
      data = await response.json();
      lat = data.countryInfo.lat;
      long = data.countryInfo.long;
      zoom = 4;
    }
    setCountry(countryCode);
    setCountryInfo(data);
    setMapCenter([lat, long]);
    setMapZoom(zoom);
  };

  const getCountriesData = async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
      cases: country.cases,
    }));
    console.log(data);
    setCountries(sort(countries));
    setMapCountries(data);
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    getCountriesData();
  }, [country]);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>COVID-19 Tracker</h2>
        </div>
        <div className="app__form">
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__cards">
          <Cards
            isRed
            title="Cases"
            cases={formatNumbers(countryInfo.todayCases)}
            total={formatNumbers(countryInfo.cases)}
            onClick={(e) => setCasesType("cases")}
          />
          <Cards
            isGreen
            title="Recovered"
            cases={formatNumbers(countryInfo.todayRecovered)}
            total={formatNumbers(countryInfo.recovered)}
            onClick={(e) => setCasesType("recovered")}
          />
          <Cards
            isGrey
            title="Deaths"
            cases={formatNumbers(countryInfo.todayDeaths)}
            total={formatNumbers(countryInfo.deaths)}
            onClick={(e) => setCasesType("deaths")}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h2>Nationwide Cases</h2>
          <Table countries={countries} />
          <h2>Graph of {casesType}</h2>
          <Graph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
