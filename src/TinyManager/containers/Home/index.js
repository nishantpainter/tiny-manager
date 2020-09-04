import React from "react";
import { Fade, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Todos from "TinyManager/containers/Todos";
import QuoteService from "TinyManager/services/QuoteService";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "inherit",
    height: "inherit",
  },
  todos: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const quote = QuoteService.getQuote();
  const classes = useStyles();
  return (
    <Fade in={true}>
      <div className={classes.container}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {quote}
        </Typography>
        <Todos className={classes.todos} />
      </div>
    </Fade>
  );
}

export default Home;
