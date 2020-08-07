import React from "react";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ name, cases }) => (
        <tr>
          <td>{name}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
