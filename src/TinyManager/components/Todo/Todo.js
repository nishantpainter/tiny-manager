import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "TinyManager/components/IconButton";
import { TodoType } from "TinyManager/types";

const useStyles = makeStyles({
  item: {
    listStyle: "none",
  },
});

function Todo(props) {
  const { todo, divider, onClick, onCheck, onDelete } = props;
  const { title, completed } = todo;

  const classes = useStyles();

  const handleCheck = useCallback(
    (event) => {
      if (onCheck) {
        onCheck(event, todo);
      }
    },
    [onCheck, todo]
  );

  const handleDelete = useCallback(
    (event) => {
      if (onDelete) {
        onDelete(event, todo);
      }
    },
    [onDelete, todo]
  );

  const handleClick = useCallback(
    (event) => {
      if (onClick) {
        onClick(event, todo);
      }
    },
    [onClick, todo]
  );

  return (
    <ListItem
      ContainerProps={{ className: classes.item }}
      divider={divider}
      button
      dense
    >
      <ListItemIcon>
        <Checkbox
          color="primary"
          edge="start"
          checked={completed}
          disableRipple
          onChange={handleCheck}
        />
      </ListItemIcon>
      <ListItemText
        onClick={handleClick}
        primary={title}
        primaryTypographyProps={{
          color: completed ? "textSecondary" : "initial",
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          icon="delete"
          edge="end"
          size="small"
          onClick={handleDelete}
        ></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Todo.propTypes = {
  /**
   * Todo
   */
  todo: TodoType,
  /**
   * Divider beneath todo
   */
  divider: PropTypes.bool,
  /**
   * Todo on check handler
   */
  onCheck: PropTypes.func,
  /**
   * Todo on delete handler
   */
  onDelete: PropTypes.func,
  /**
   * Todo on click handler
   */
  onClick: PropTypes.func,
};

Todo.defaultProps = {
  todo: {},
  divider: true,
};

export default Todo;
