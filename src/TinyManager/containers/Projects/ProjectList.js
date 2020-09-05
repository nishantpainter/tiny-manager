import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Fade } from "@material-ui/core";

import Loader from "TinyManager/components/Loader";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  projectCard: {
    marginBottom: theme.spacing(2),
  },
}));

function ProjectList(props) {
  const { onProjectClick, onNewProject } = props;

  const classes = useStyles();

  const [loadingProjects, setLoadingProjects] = React.useState(true);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    TinyManagerAPI.fetchProjects()
      .then((projects) => {
        setLoadingProjects(false);
        setProjects(projects);
      })
      .catch(() => {
        setLoadingProjects(false);
      });
  }, []);

  const handleProjectClick = (e, project) => {
    onProjectClick(project.id);
  };

  const handleNewProject = React.useCallback(() => {
    onNewProject();
  }, [onNewProject]);

  if (loadingProjects) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Typography variant="h5" gutterBottom>
          Project List
        </Typography>
        <Button color="primary" variant="outlined" onClick={handleNewProject}>
          Add New
        </Button>
        <br />
        <br />
        {projects && projects.length ? (
          <div
            style={{ height: "85%", padding: `32px 32px`, overflow: "auto" }}
          >
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <ProjectCard
                  project={project}
                  className={classes.projectCard}
                  onClick={handleProjectClick}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <Typography variant="body1">No available projects.</Typography>
        )}
      </div>
    </Fade>
  );
}

export default ProjectList;
