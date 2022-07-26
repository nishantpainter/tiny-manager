import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Topbar from "TinyManager/containers/Topbar";
import Home from "TinyManager/containers/Home";
import Projects from "TinyManager/containers/Projects";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    height: "100%",
  },
  main: {
    display: "flex",
    height: `calc(100% - ${theme.spacing(8)}px)`, // $topbar height
    width: "100%",
    overflow: "auto",
  },
}));

function Content() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.main}>
        <Switch>
          <Route path="/projects" component={Projects} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default Content;
