import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Button, Fade } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const [{ loading, project }, setStore] = React.useState({
    loading: true,
    project: {},
  });

  React.useEffect(() => {
    if (projectId) {
      setStore((store) => ({ ...store, loading: true }));
      TinyManagerAPI.fetchProject(projectId)
        .then((project) => {
          setStore((store) => ({ ...store, loading: false, project }));
        })
        .catch(redirectToProjectList);
    } else {
      setStore((store) => ({ ...store, loading: false }));
      redirectToProjectList();
    }
  }, [projectId, redirectToProjectList]);

  const handleNewTask = React.useCallback(() => {}, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div>
        <Typography variant="h5" gutterBottom>
          Project View
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProjectCard project={project} />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="outlined" onClick={handleNewTask}>
              Add New Task
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

ProjectView.propTypes = {
  redirectToProjectList: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export default ProjectView;
