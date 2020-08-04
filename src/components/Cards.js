import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Cards.css"

function Cards({title, cases, total}) {
  return (
    <Card className="card">
      <CardContent>
        <Typography className="card__title">{title}</Typography>
        <Typography className="card__cases">{cases}</Typography>
        <Typography className="card__total">{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
