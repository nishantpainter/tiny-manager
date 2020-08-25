import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

function ProjectView(props) {
  const { match, redirectToProjectList } = props;
  const { params } = match;
  const { projectId } = params;

  const [loading, setLoading] = React.useState(true);
  const [project, setProject] = React.useState({});

  React.useEffect(() => {
    if (projectId) {
      setLoading(true);
      TinyManagerAPI.fetchProject(projectId)
        .then((project) => {
          setLoading(false);
          setProject(project);
        })
        .catch(redirectToProjectList);
    } else {
      setLoading(false);
      redirectToProjectList();
    }
  }, [projectId, redirectToProjectList]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Project View
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProjectCard project={project} />
        </Grid>
      </Grid>
    </>
  );
}

export default ProjectView;
