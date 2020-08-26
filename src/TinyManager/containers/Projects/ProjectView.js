import React from "react";
import { Typography, Grid, Fade } from "@material-ui/core";

import ProjectCard from "TinyManager/components/ProjectCard";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import Loader from "TinyManager/components/Loader";

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
        </Grid>
      </div>
    </Fade>
  );
}

export default ProjectView;
