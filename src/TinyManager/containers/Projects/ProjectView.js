import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Button, Fade, Dialog } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";
import TaskForm from "TinyManager/components/TaskForm";

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const [{ loading, project }, setStore] = React.useState({
    loading: true,
    project: {},
  });

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);

  const handleOpenTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = React.useCallback(() => {
    setTaskDialogOpen(false);
  }, []);

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
            <Button
              color="primary"
              variant="outlined"
              onClick={handleOpenTaskDialog}
            >
              Add New Task
            </Button>
          </Grid>
        </Grid>
        <Dialog open={taskDialogOpen} onClose={handleCloseTaskDialog}>
          <TaskForm onCancel={handleCloseTaskDialog} />
        </Dialog>
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
