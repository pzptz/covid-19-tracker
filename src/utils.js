import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { casesColor } from "./constants/color";

export const drawCirclesOnMap = (countries, casesType = "cases") =>
  countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.5}
      color={casesColor[casesType].hex}
      fillColor={casesColor[casesType].hex}
      radius={Math.sqrt(country[casesType]) * casesColor[casesType].multiplier}
    >
      <Popup>
        <div className="info-container">
          {/* - country flag
                  - country name
                  - cases count
                  - recovered count
                  - death count */}
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
          <div className="info-center">
            <div className="info-name">{country.country}</div>
          </div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const formatNumbers = (number) =>
  number ? `+${numeral(number).format("0,0")}` : "+0";

export const sort = (data) => {
  const sorted = [...data];
  sorted.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sorted;
};
