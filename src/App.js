import React, { useState, useEffect } from "react";
import "./App.css";

// components
import Cards from "./components/Cards";

function App() {
  const [casesType, setCasesType] = useState("");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  return (
    <>
      <div className="app__left">
        <div className="app">
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
    </>
  );
}

export default App;
