import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, Fade, Dialog } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";
import TaskForm from "TinyManager/components/TaskForm";
import TaskCard from "TinyManager/components/TaskCard";

const useStyles = makeStyles((theme) => ({
  taskCard: {
    marginBottom: theme.spacing(2),
  },
}));

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const classes = useStyles();
  
  const [{ loading, project, tasks }, setStore] = React.useState({
    loading: true,
    project: {},
    tasks: [],
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
          TinyManagerAPI.fetchTasks(projectId).then((tasks) => {
            setStore((store) => ({ ...store, loading: false, project, tasks }));
          });
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
        {tasks && tasks.length ? (
          <div
            style={{ height: "85%", padding: `32px 32px`, overflow: "auto" }}
          >
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                className={classes.taskCard}
              />
            ))}
          </div>
        ) : (
          <Typography variant="body1">No available tasks.</Typography>
        )}
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
