import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Cards.css";

function Cards({ isRed, isGreen, isGrey, title, cases, total, onClick }) {
  const getColor = () => {
    let color = "#ff3300";
    if (isGreen) {
      color = "#33ffbb";
    } else if (isGrey) {
      color = "#808080";
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
