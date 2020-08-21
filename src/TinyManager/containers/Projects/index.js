import React from "react";
import { Route, Switch } from "react-router-dom";

import ProjectView from "TinyManager/containers/Projects/ProjectView";
import ProjectList from "TinyManager/containers/Projects/ProjectList";

function Projects(props) {
  const { match } = props;
  const { path } = match;
  return (
    <>
      <Switch>
        <Route path={path + "/:projectId"} component={ProjectView} />
        <Route path={path} component={ProjectList} />
      </Switch>
    </>
  );
}

export default Projects;
