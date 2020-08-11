import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: { display: false },
  elements: { point: { radius: 0 } },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: { parser: "MM/DD/YY", tooltipFormat: "ll" },
      },
    ],
    yAxes: [
      {
        gridLines: { display: false },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function Graph({ casesType = "cases" }) {
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
      console.log(graphData);
      setData(graphData);
    };
    fetchData();
  }, [casesType]);

  return (
    <div className="app__graph">
      {data?.length > 0 && (
        <Line
          data={{
            dataset: [
              {
                backgroundColor: "rgba(255,0,0,0.2)",
                borderColor: "ff3300",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Graph;
