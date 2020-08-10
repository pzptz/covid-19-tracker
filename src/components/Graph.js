import React, { useState, useEffect } from "react";

function Graph({ casesType }) {
  const [data, setData] = useState([]);

  const buildGraphData = (data, casesType = "cases") => {
    const graphData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        graphData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return graphData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=200"
      );
      const data = await response.json();
      const graphData = buildGraphData(data, casesType);
      setData(graphData);
    };
  }, [casesType]);

  return <div></div>;
}

export default Graph;
