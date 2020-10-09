import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Topbar from "TinyManager/containers/Topbar";
import Home from "TinyManager/containers/Home";
import Projects from "TinyManager/containers/Projects";

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
      <Topbar />
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

export default Content;
