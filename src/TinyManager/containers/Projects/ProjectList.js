import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Grid from "@material-ui/core/Grid";

function ProjectList(props) {
  const { onProjectClick } = props;

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    TinyManagerAPI.fetchProjects().then(setProjects);
  }, []);

  const handleProjectClick = (e, project) => {
    onProjectClick(project.id);
  };

  return (
    <>
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
              <Grid item xs={12}>
                <ProjectCard project={project} onClick={handleProjectClick} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No available projects.</Typography>
      )}
    </>
  );
}

export default ProjectList;
