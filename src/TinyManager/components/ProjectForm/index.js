import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function ProjectForm(props) {
  const {
    title,
    values,
    errors,
    disabled,
    onSubmit,
    onChange,
    onCancel,
  } = props;

  const classes = useStyles();
  return (
    <form onSubmit={onSubmit} noValidate>
      <Paper className={classes.paper}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              {title}
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              margin="dense"
              disabled={disabled}
              error={Boolean(errors.name)}
              helperText={errors.name}
              value={values.name}
              onChange={onChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              rows={4}
              disabled={disabled}
              error={Boolean(errors.description)}
              helperText={errors.description}
              value={values.description}
              onChange={onChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} align="right">
            <Button variant="outlined" disabled={disabled} onClick={onCancel}>
              Cancel
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={disabled}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

ProjectForm.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  title: "New Project",
  onChange: () => {},
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: () => {},
};

export default ProjectForm;
