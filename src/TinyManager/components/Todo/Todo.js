import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "TinyManager/components/IconButton";
import { TodoType } from "TinyManager/types";
import { noop } from "../utils";

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
    [onCheck, todo]
  );

  const handleDelete = React.useCallback(
    (e) => {
      onDelete(e, todo);
    },
    [onDelete, todo]
  );

  const handleClick = React.useCallback(
    (e) => {
      onClick(e, todo);
    },
    [onClick, todo]
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
  onCheck: noop,
  onDelete: noop,
  onClick: noop,
};

export default Todo;
