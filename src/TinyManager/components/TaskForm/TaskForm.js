import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";
import { TaskType } from "TinyManager/types";
import { identity, noop } from "../utils";

const PRIORITIES = [
  {
    value: 0,
    label: "Low",
  },
  {
    value: 1,
    label: "Medium",
  },
  {
    value: 2,
    label: "High",
  },
];

const PERCENTAGES = new Array(11)
  .fill(0)
  .map((_, i) => ({ value: i * 10, label: `${i * 10}%` }));

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function TaskForm(props) {
  const {
    title,
    values,
    errors,
    disabled,
    translate,
    onSubmit,
    onChange,
    onCancel,
  } = props;

  const classes = useStyles();
  return (
    <form onSubmit={onSubmit} noValidate>
      <Paper className={classes.paper}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              {title}
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              label={translate("Title")}
              margin="dense"
              disabled={disabled}
              error={Boolean(errors.title)}
              helperText={errors.title}
              value={values.title}
              onChange={onChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              margin="dense"
              disabled={disabled}
              fullWidth
            >
              <InputLabel>{translate("Percentage")}</InputLabel>
              <Select
                name="progress"
                label={translate("Percentage")}
                margin="dense"
                defaultValue={PERCENTAGES[0].value}
                value={values.progress}
                onChange={onChange}
              >
                {PERCENTAGES.map((percentage) => (
                  <MenuItem key={percentage.value} value={percentage.value}>
                    {percentage.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              margin="dense"
              disabled={disabled}
              fullWidth
            >
              <InputLabel>{translate("Priority")}</InputLabel>
              <Select
                label={translate("Priority")}
                margin="dense"
                name="priority"
                defaultValue={PRIORITIES[0].value}
                value={values.priority}
                onChange={onChange}
              >
                {PRIORITIES.map((priority) => (
                  <MenuItem key={priority.value} value={priority.value}>
                    {translate(priority.label)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="note"
              name="note"
              label={translate("Note")}
              rows={4}
              disabled={disabled}
              error={Boolean(errors.note)}
              helperText={errors.note}
              value={values.note}
              onChange={onChange}
              fullWidth
              multiline
            />
          </Grid>

          <Grid item xs={12} align="right">
            <Button variant="outlined" disabled={disabled} onClick={onCancel}>
              {translate("Cancel")}
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={disabled}
            >
              {translate("Save")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

TaskForm.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  values: TaskType,
  errors: TaskType,
  translate: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

TaskForm.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  title: "New Task",
  translate: identity,
  onChange: noop,
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: noop,
};

export default TaskForm;
