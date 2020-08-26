import React from "react";
import { Fade, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import QuoteService from "TinyManager/services/QuoteService";

const useStyles = makeStyles({
  container: {
    width: "inherit",
    height: "inherit",
  },
});

function Home() {
  const quote = QuoteService.getQuote();
  const classes = useStyles();
  return (
    <Fade in={true}>
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Home
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {quote}
        </Typography>
      </div>
    </Fade>
  );
}

export default Home;
