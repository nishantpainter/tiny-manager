import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import ProjectView from "TinyManager/containers/Projects/ProjectView";
import ProjectList from "TinyManager/containers/Projects/ProjectList";
import ProjectForm from "TinyManager/containers/Projects/ProjectForm";

function Projects(props) {
  const { match, history } = props;
  const { path, url } = match;

  const redirectToNewProject = () => {
    history.push(url + `/new`);
  };

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
          path={path + "/new"}
          render={(props) => <ProjectForm {...props} />}
        />
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
            <ProjectList
              {...props}
              onProjectClick={redirectToProjectView}
              onNewProject={redirectToNewProject}
            />
          )}
        />
      </Switch>
    </>
  );
}

Projects.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Projects;
