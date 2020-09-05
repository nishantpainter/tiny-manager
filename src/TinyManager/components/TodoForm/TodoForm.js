import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";

import { TodoType } from "TinyManager/types";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function TodoForm(props) {
  const {
    title,
    values,
    errors,
    disabled,
    onChange,
    onSubmit,
    onCancel,
  } = props;

  const classes = useStyles();
  return (
    <form onSubmit={onSubmit}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              {title}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="title"
              name="title"
              label="Title"
              disabled={disabled}
              values={values.title}
              error={errors.title}
              onChange={onChange}
              fullWidth
              required
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

TodoForm.propTypes = {
  title: PropTypes.string,
  values: TodoType,
  errors: TodoType,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

TodoForm.defaultProps = {
  title: "Add Todo",
  values: {},
  errors: {},
  onSubmit: (e) => e.preventDefault(),
  onChange: () => {},
  onCancel: () => {},
};

export default TodoForm;
