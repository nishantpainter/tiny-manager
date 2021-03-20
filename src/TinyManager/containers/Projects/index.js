import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import ProjectView from "TinyManager/containers/Projects/ProjectView";
import ProjectList from "TinyManager/containers/Projects/ProjectList";
import ProjectForm from "TinyManager/containers/Projects/ProjectForm";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: 500,
  },
}));

function Projects(props) {
  const { match, history } = props;
  const { path, url } = match;

  const classes = useStyles();

  const redirectToNewProject = () => {
    history.push(url + `/new`);
  };

  const redirectToProjectView = (projectId) => {
    history.push(url + `/${projectId}`);
  };

  const redirectToProjectList = React.useCallback(() => {
    history.push(url);
  }, [history, url]);

  const handleAddNewProject = React.useCallback(
    (values) => {
      TinyManagerAPI.addProject(values).then(redirectToProjectList);
    },
    [redirectToProjectList]
  );

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Switch>
          <Route
            path={path + "/new"}
            render={(props) => (
              <ProjectForm
                {...props}
                onCancel={redirectToProjectList}
                onSubmit={handleAddNewProject}
              />
            )}
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
      </div>
    </div>
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
