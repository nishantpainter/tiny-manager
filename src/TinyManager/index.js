import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Topbar from "TinyManager/containers/Topbar";
import Home from "TinyManager/containers/Home";
import Projects from "TinyManager/containers/Projects";
import ThemeProvider from "TinyManager/services/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  topbar: {
    minHeight: theme.spacing(8), //48
  },
  main: {
    overflow: "auto",
    maxWidth: 500,
    margin: "auto",
    padding: theme.spacing(3),
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
          <Route path="/projects" component={Projects} />
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
