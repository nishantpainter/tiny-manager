import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Topbar from "TinyManager/containers/Topbar";
import Home from "TinyManager/containers/Home";
import Project from "TinyManager/containers/Project";
import ThemeProvider from "TinyManager/services/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  topbar: {
    minHeight: theme.spacing(8), //48
  },
  main: {
    overflow: "auto",
    padding: theme.spacing(),
    height: `calc(100% - ${theme.spacing(8)}px)`,
  },
}));

function Content() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.topbar} />
      <main className={classes.main}>
        <Switch>
          <Route path="/project" component={Project} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </>
  );
}

function TinyManager() {
  return (
    <ThemeProvider>
      <Router>
        <Topbar />
        <Content />
      </Router>
    </ThemeProvider>
  );
}

export default TinyManager;
