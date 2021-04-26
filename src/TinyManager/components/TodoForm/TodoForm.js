import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import { TodoType } from "TinyManager/types";
import { noop } from "../utils";

const useStyles = makeStyles((theme) => ({
  form: {
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
    <form onSubmit={onSubmit} className={classes.form} noValidate>
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
            value={values.title}
            error={Boolean(errors.title)}
            helperText={errors.title}
            onChange={onChange}
            fullWidth
            required
            autoFocus
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
  disabled: false,
  onSubmit: (e) => e.preventDefault(),
  onChange: noop,
  onCancel: noop,
};

export default TodoForm;
