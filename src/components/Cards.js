import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Cards.css";
import { casesColor } from "../constants/color";

function Cards({ isRed, isGreen, isGrey, title, cases, total, onClick }) {
  const getColor = () => {
    let color = casesColor.cases.hex;
    if (isGreen) {
      color = casesColor.recovered.hex;
    } else if (isGrey) {
      color = casesColor.deaths.hex;
    }
    return color;
  };

  return (
    <Card className="card" onClick={onClick}>
      <CardContent>
        <Typography className="card__title">{title}</Typography>
        <Typography className="card__cases" style={{ color: getColor() }}>
          {cases}
        </Typography>
        <Typography className="card__total">{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
