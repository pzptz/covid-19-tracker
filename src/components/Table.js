import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {console.log(countries)}
      {countries.map(({ name, cases }) => (
        <tr>
          <td>{name}</td>
          <td>{numeral(cases).format("0,0")}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
