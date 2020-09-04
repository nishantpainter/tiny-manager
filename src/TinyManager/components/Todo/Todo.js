import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  listItemContainer: {
    listStyle: "none",
  },
});

function Todo(props) {
  const { title, divider, isCompleted, onCheck } = props;

  const classes = useStyles();
  return (
    <ListItem
      ContainerProps={{ className: classes.listItemContainer }}
      divider={divider}
      button
      dense
    >
      <ListItemIcon>
        <Checkbox
          color="primary"
          edge="start"
          checked={isCompleted}
          disableRipple
          onChange={onCheck && onCheck}
        />
      </ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          color: isCompleted ? "textSecondary" : "initial",
        }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" size="small">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  divider: PropTypes.bool,
  onCheck: PropTypes.func,
};

Todo.defaultProps = {
  isCompleted: false,
  divider: true,
};

export default Todo;
