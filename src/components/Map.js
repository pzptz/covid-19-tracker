import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {drawCirclesOnMap} from "../utils";

function Map({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {drawCirclesOnMap(countries, casesType)}
        {console.log(center)}
      </LeafletMap>
    </div>
  );
}

export default Map;
