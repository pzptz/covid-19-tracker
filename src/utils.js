import React from "react";
import { Circle, Popup } from "react-leaflet";

// const countries = data.map((country) => ({
//     name: country.country,
//     value: country.countryInfo.iso2,
//     cases: country.cases,
//   }));

/*
    countries = {name: "United Kingdom", value: "UK", cases: "1000"},
                {name: "China", value: "CN", cases: "500"},
                {name: "United States", value: "USA", cases: "10000"},
                ...
*/

const casesTypeProperties = {
  cases: {
    hex: "#ff3300",
    multiplier: 1000,
  },
  recovered: {
    hex: "#33ffbb",
    multiplier: 1000,
  },
  deaths: {
    hex: "#808080",
    multiplier: 1000,
  },
};

export const drawCirclesOnMap = (countries, casesType = "cases") =>
  countries.map((country) => (
    <Circle
      center={(country.countryInfo.lat, country.countryInfo.long)}
      fillOpacity={0.5}
      color={casesTypeProperties[casesType].hex}
      fillColor={casesTypeProperties[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) *
        casesTypeProperties[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          {/* - country flag
                  - country name
                  - cases count
                  - recovered count
                  - death count */}
            <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}} />
            <div className="info-name">{country.country}</div>
            <div className="info-recovered">Recovered: {country.cases}</div>
            <div className="info-deaths">Deaths: {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ));
