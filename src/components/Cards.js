import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Cards() {
  return (
    <Card className="card">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Title
        </Typography>
        <Typography variant="h5" component="h2">
          Cases
        </Typography>
        <Typography color="textSecondary">Total</Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
