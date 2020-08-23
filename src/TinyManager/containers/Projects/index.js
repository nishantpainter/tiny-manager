import React from "react";
import { Route, Switch } from "react-router-dom";

import ProjectView from "TinyManager/containers/Projects/ProjectView";
import ProjectList from "TinyManager/containers/Projects/ProjectList";

function Projects(props) {
  const { match, history } = props;
  const { path, url } = match;

  const redirectToProjectView = (projectId) => {
    history.push(url + `/${projectId}`);
  };

  const redirectToProjectList = () => {
    history.push(url);
  };

  return (
    <>
      <Switch>
        <Route
          path={path + "/:projectId"}
          render={(props) => (
            <ProjectView
              {...props}
              redirectToProjectList={redirectToProjectList}
            />
          )}
        />
        <Route
          path={path}
          render={(props) => (
            <ProjectList {...props} onProjectClick={redirectToProjectView} />
          )}
        />
      </Switch>
    </>
  );
}

export default Projects;
