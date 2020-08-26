import React from "react";
import { Grid, Button, Typography, Fade } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import Loader from "TinyManager/components/Loader";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

function ProjectList(props) {
  const { onProjectClick } = props;

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

  if (loadingProjects) {
    return <Loader />;
  }

  return (
    <Fade in={true}>
      <div>
        <Typography variant="h5" gutterBottom>
          Project List
        </Typography>
        <Button color="primary" variant="outlined">
          Add New
        </Button>
        <br />
        <br />
        {projects && projects.length ? (
          <Grid container spacing={2}>
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <Grid item xs={12} zeroMinWidth>
                  <ProjectCard project={project} onClick={handleProjectClick} />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No available projects.</Typography>
        )}
      </div>
    </Fade>
  );
}

export default ProjectList;
