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
    display: "flex",
    height: "100%",
    width: "100%",
    overflow: "auto",
    justifyContent: "center",
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
