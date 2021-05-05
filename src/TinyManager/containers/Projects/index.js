import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { join, withProps } from "TinyManager/services/Utils";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import ProjectView from "TinyManager/containers/Projects/ProjectView";
import ProjectList from "TinyManager/containers/Projects/ProjectList";
import ProjectForm from "TinyManager/containers/Projects/ProjectForm";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    display: "flex",
    padding: theme.spacing(3.5),
  },
}));

function Projects(props) {
  const { match, history } = props;
  const { path, url } = match;

  const classes = useStyles();

  const redirect = useCallback(
    (url) => {
      history.push(url);
    },
    [history]
  );

  const redirectToNewProject = useCallback(() => {
    redirect(join(url, "/new"));
  }, [redirect, url]);

  const redirectToProjectView = useCallback(
    (projectId) => {
      redirect(join(url, "/", projectId));
    },
    [url, redirect]
  );

  const redirectToProjectList = useCallback(() => {
    redirect(url);
  }, [redirect, url]);

  const handleAddNewProject = useCallback(
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
            path={join(path, "/new")}
            render={withProps(ProjectForm, {
              onCancel: redirectToProjectList,
              onSubmit: handleAddNewProject,
            })}
          />
          <Route
            path={join(path, "/:projectId")}
            render={withProps(ProjectView, {
              redirectToProjectList,
            })}
          />
          <Route
            path={path}
            render={withProps(ProjectList, {
              onProjectClick: redirectToProjectView,
              onNewProject: redirectToNewProject,
            })}
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
