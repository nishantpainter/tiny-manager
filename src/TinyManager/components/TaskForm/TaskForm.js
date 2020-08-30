import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "../Paper";

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

          <Grid item xs={12} sm={6}>
            <TextField
              id="title"
              name="title"
              label="Title"
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
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                margin="dense"
                defaultValue={PRIORITIES[0].value}
              >
                {PRIORITIES.map((priority) => (
                  <MenuItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="note"
              name="note"
              label="Note"
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

TaskForm.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  title: "New Task",
  onChange: () => {},
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: () => {},
};

export default TaskForm;
