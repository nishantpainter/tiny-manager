import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";
import { ProjectType } from "TinyManager/types";
import { noop } from "../utils";

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

ProjectForm.propTypes = {
  /**
   * Title of the form
   */
  title: PropTypes.string,
  /**
   * Values of the form
   */
  values: ProjectType,
  /**
   * Errors in the form
   */
  errors: ProjectType,
  /**
   * Disabled
   */
  disabled: PropTypes.bool,
  /**
   * Input on change handler
   */
  onChange: PropTypes.func,
  /**
   * Form on submit handler
   */
  onSubmit: PropTypes.func,
  /**
   * Form cancel handler
   */
  onCancel: PropTypes.func,
};

ProjectForm.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  title: "New Project",
  onChange: noop,
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: noop,
};

export default ProjectForm;
