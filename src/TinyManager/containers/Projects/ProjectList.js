import React from "react";
import Typography from "@material-ui/core/Typography";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Grid from "@material-ui/core/Grid";

function ProjectList() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    TinyManagerAPI.fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Project List
      </Typography>
      <br />
      {projects && projects.length ? (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} item xs={12} sm={6}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No available projects.</Typography>
      )}
    </>
  );
}

export default ProjectList;
