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

import { TodoType } from "TinyManager/types";

const useStyles = makeStyles({
  listItemContainer: {
    listStyle: "none",
  },
});

function Todo(props) {
  const { todo, divider, onClick, onCheck, onDelete } = props;
  const { title, completed } = todo;

  const classes = useStyles();

  const handleCheck = React.useCallback(
    (e) => {
      onCheck(e, todo);
    },
    [onCheck]
  );

  const handleDelete = React.useCallback(
    (e) => {
      onDelete(e, todo);
    },
    [onDelete]
  );

  const handleClick = React.useCallback(
    (e) => {
      onClick(e, todo);
    },
    [onClick]
  );

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
        <IconButton edge="end" size="small" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
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
  onCheck: () => {},
  onDelete: () => {},
  onClick: () => {},
};

export default Todo;
