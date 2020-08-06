import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

// components
import Cards from "./components/Cards";

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState(["US", "UK"]);
  const [country, setCountry] = useState("worldwide");

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    let URL = "";
    if (countryCode === "worldwide") URL = "https://disease.sh/v3/covid-19/all";
    else URL = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await fetch(URL);
    const data = await response.json();
    setCountry(countryCode);
    setCountryInfo(data);
  };

  const getCountriesData = async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
    }));
    setCountries(countries);
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    getCountriesData();
  }, [countries]);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>Title</h2>
        </div>
        <div className="app__form">
          <FormControl>
            <Select variant="outlined" onChange={onCountryChange}>
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__cards">
          <Cards
            title="Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <Cards
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <Cards
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>
      <div className="app__right"></div>
    </div>
  );
}

export default App;
